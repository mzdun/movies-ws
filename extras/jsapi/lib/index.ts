import {MovieEventTarget} from './Event';
import {movies} from './proto/bundle';
import WsClient from './WsClient';

export interface FilterListing {
	title?: string;
	items: movies.listing.v1.IMovieReference[];
	links: movies.info.v1.ILink[];
}

export class Service extends MovieEventTarget {
	_ws: WsClient;
	_lang: string = navigator.language;
	_clientId?: string = sessionStorage.getItem('clientId') ?? undefined;
	_onlangs: () => void;
	constructor(host: Promise<string>) {
		super();

		this._ws = new WsClient(
		    host, (event) => this.dispatchEvent(event),
		    () => this._onConnectionChange());

		const self = this;
		this._onlangs = () => self.updateLangs();
		window.addEventListener('languagechange', this._onlangs);

		this.updateLangs();
	}

	get lang() { return this._lang; }

	get clientId() { return this._clientId; }

	get connected() { return this._ws.connected; }

	updateLangs() {
		(async () => {
			const langChange = (await this._ws.send({
				                   langChange: {
					                   langId: [...navigator.languages],
					                   clientId: this._clientId
				                   }
			                   })).langChange ||
			    {};
			const nextLang = langChange.langId || '';
			const clientId = langChange.clientId ?? undefined;

			// const langChanged = nextLang !== this._lang;
			this._lang = nextLang;
			// if (langChanged)
			this.dispatchEvent({message: 'languageChange'});

			const clientIdChanged = clientId !== this._clientId;
			this._clientId = clientId;
			if (clientIdChanged && clientId !== undefined) {
				sessionStorage.setItem('clientId', clientId);
				this.dispatchEvent({message: 'clientIdChange'});
			}
		})();
	}

	_onConnectionChange() {
		this.dispatchEvent({message: 'connectionChange'});
		if (this.connected) this.updateLangs();
	}

	async getConfig() {
		return (await this._ws.send({getConfig: {}})).getConfig || {};
	};

	async getFilterListing(
	    category: string, term: string, filters: movies.filters.v1.IFilter[],
	    sort: string[], search?: string) {
		const result =
		    (await this._ws.send({
			    getFilterListing: {filters, sort, search, category, term}
		    })).getFilterListing;
		return {
			title: result?.title || undefined, items: result?.items || [],
			    links: result?.links || [],
		}
		//
	}

	async getListing(
	    filters: movies.filters.v1.IFilter[], sort: string[], search?: string) {
		return (await this._ws.send({
			       getListing: {filters, sort, search}
		       })).getListing?.groups ??
		    [];
	}

	async getMovieInfo(key: string) {
		return (await this._ws.send({
			       getMovieInfo: {key}
		       })).getMovieInfo?.info ||
		    {title: {local: key}};
	}

	async getVideoFile(key: string) {
		return (await this._ws.send({getVideoFile: {key}})).getVideoFile || {};
	}

	async setVideoPosition(key: string, where: number) {
		const when = new Date().valueOf()
		return (await this._ws.send({
			       setVideoPosition: {key, lastWatched: {where, when}}
		       })).setVideoPosition ||
		    {};
	}

	async setVideoInfo(key: string, info: movies.info.v1.IVideoInfo) {
		return (await this._ws.send({
			       setVideoInfo: {key, info}
		       })).setVideoInfo ||
		    {};
	}

	async openMovie(id: string) { await this._ws.send({openMovie: {id}}); }
};

export {movies};
export * from './filters';
export * from './appstr';
