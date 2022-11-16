import {movies} from './proto/bundle';
type BasicEventType = Exclude<movies.rpc.v1.Event['message'], undefined>;
type MovieEventType = Exclude<BasicEventType, 'databaseContentsChange'>;
type EventType = BasicEventType|'languageChange';
type IEvent = movies.rpc.v1.IEvent;

export interface MovieEvent extends Event {
	data: IEvent;
}

export class MovieEvent extends Event {
	data: IEvent;
	constructor(data: IEvent&{message: EventType}) {
		super(data.message);
		this.data = data;
	}
}

export class MovieEventTarget {
	private _dispatch: EventTarget;

	constructor() {
		this._dispatch = new EventTarget();
	}

	dispatchEvent(data: IEvent&{message?: EventType}): boolean {
		if (!data.message)
			return false;
		return this._dispatch.dispatchEvent(
		    new MovieEvent(data as (IEvent & {message: EventType})));
	}

	addEventListener(type: 'languageChange', callback?: () => any): void;
	addEventListener(type: 'databaseContentsChange', callback?: () => any):
	    void;
	addEventListener(type: MovieEventType, callback?: (e: MovieEvent) => any):
	    void;
	addEventListener(type: EventType, callback?: (e: MovieEvent) => any): void {
		this._dispatch.addEventListener(
		    type, callback as EventListenerOrEventListenerObject || null);
	}

	removeEventListener(type: 'languageChange', callback?: () => any): void;
	removeEventListener(type: 'databaseContentsChange', callback?: () => any):
	    void;
	removeEventListener(
	    type: MovieEventType, callback?: (e: MovieEvent) => any): void;
	removeEventListener(type: EventType, callback?: (e: MovieEvent) => any):
	    void {
		this._dispatch.removeEventListener(
		    type, callback as EventListenerOrEventListenerObject || null);
	}
};
