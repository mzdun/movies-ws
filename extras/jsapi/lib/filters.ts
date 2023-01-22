import {movies} from './proto/bundle';

export type FilterKind = 'range'|'token'|'on_off';

export interface BasicFilter {
	kind: FilterKind;
	field: string;
}

export interface RangeFilter extends BasicFilter {
	low: number;
	hight: number;
	includeMissing: boolean;
}

export interface TokenFilter extends BasicFilter {
	token: string[];
	includeMissing: boolean;
}

export interface OnOffFilter extends BasicFilter {
	on: boolean;
}

export type AnyFilter = RangeFilter|TokenFilter|OnOffFilter;

export function rangeFilter(
    field: string, low: number, high: number,
    includeMissing: boolean): movies.filters.v1.IFilter {
	return {range: {field, low, high, includeMissing}};
}

export function tokensFilter(
    field: string, token: string[],
    includeMissing: boolean): movies.filters.v1.IFilter {
	return {tokens: {field, token, includeMissing}};
}


export function onOffFilter(field: string): movies.filters.v1.IFilter {
	const on = field.length > 0 && field[0] !== '!';
	if (!on) field = field.substring(1);
	return {onOff: {field, on}};
}

export function makeFilter(filter: AnyFilter): (movies.filters.v1.IFilter|
                                                undefined) {
	switch (filter.kind) {
		case 'range':
			const range = filter as RangeFilter;
			return rangeFilter(
			    range.field,
			    range.low,
			    range.hight,
			    range.includeMissing,
			);
		case 'token':
			const tokens = filter as TokenFilter;
			return tokensFilter(
			    tokens.field,
			    tokens.token,
			    tokens.includeMissing,
			);
		case 'on_off':
			const onOff = filter as OnOffFilter;
			return onOffFilter(onOff.on ? onOff.field : `!${onOff.field}`);
		default:
			return undefined;
	}
}

export function makeFilters(filters: AnyFilter[]): movies.filters.v1.IFilter[] {
	return filters.map(makeFilter).filter(filter => filter !== undefined) as
	    movies.filters.v1.IFilter[];
}
