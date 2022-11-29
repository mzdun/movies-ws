import {movies} from './proto/bundle';
import {QueuedSocket} from './QueuedSocket';

function ws_url(port: number) {
	const url = new URL(document.URL);
	if (url.protocol === 'https')
		url.protocol = 'wss';
	else
		url.protocol = 'ws';
	url.port = `${port}`
	url.pathname = '/app';
	return `${url}`;
}

interface Future {
	resolve: (value: movies.rpc.v1.Response) => void;
	reject: (value: any) => void;
}

export default class WsClient {
	private _conn: QueuedSocket;
	private _onEvent: (ev: movies.rpc.v1.Event) => void;

	private _next_id = 1;
	private _awaiting: Map<number, Future> = new Map();

	constructor(
	    port: number,
	    onEvent: (ev: movies.rpc.v1.Event) => void,
	    onConnectionChange: () => void,
	) {
		const url = ws_url(port);
		this._conn = new QueuedSocket(
		    (ev) => this._handle(ev.data as ArrayBuffer as Uint8Array),
		    onConnectionChange, url);
		this._onEvent = onEvent;
	}

	get connected() {
		return this._conn.connected;
	}

	async send(msg: movies.rpc.v1.IRequest) {
		const id = this._next_id;
		this._next_id += 1;

		const payload = movies.rpc.v1.Request.encode({...msg, id}).finish();

		return new Promise<movies.rpc.v1.Response>((resolve, reject) => {
			this._awaiting.set(id, {resolve, reject});
			this._conn.send(payload);
		});
	}

	_handle(msg: Uint8Array) {
		const generic =
		    movies.rpc.v1.GenericResponse.decode(new Uint8Array(msg));

		if (generic.response) {
			const response = new movies.rpc.v1.Response(generic.response);
			const cb = this._awaiting.get(response.id);
			if (cb) {
				this._awaiting.delete(response.id);
				if (response.error)
					cb.reject(response.error);
				else
					cb.resolve(response);
			} else {
				console.error('Unhandled', response);
			}
			return;
		}

		if (generic.event) {
			const event = new movies.rpc.v1.Event(generic.event);
			if (this._onEvent)
				this._onEvent(event);
			return;
		}
	}
};
