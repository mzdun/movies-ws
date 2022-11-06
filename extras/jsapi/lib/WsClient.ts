import {movies} from './proto/bundle';
import {QueuedSocket} from './QueuedSocket';

function ws_url(port: number) {
	const url = new URL(document.URL);
	if (url.protocol === 'https')
		url.protocol = 'wss';
	else
		url.protocol = 'ws';
	url.port = `${port}`
	url.pathname = '/';
	return `${url}`;
}

export default class WsClient {
	private _push: QueuedSocket;
	private _pull: QueuedSocket;
	private _onEvent: (ev: movies.rpc.v1.Event) => void;

	private _next_id = 1;
	private _awaiting: Map<number, (value: movies.rpc.v1.Response) => void> =
	    new Map();

	constructor(
	    port: number,
	    onEvent: (ev: movies.rpc.v1.Event) => void,
	    reconnect: boolean,
	) {
		const url = ws_url(port);
		this._push = new QueuedSocket(
		    (ev) => this._onevent(ev.data as ArrayBuffer as Uint8Array), false,
		    url, 'push');
		this._pull = new QueuedSocket(
		    (ev) => this._handle(ev.data as ArrayBuffer as Uint8Array),
		    reconnect, url, 'pull');
		this._pull.peer = this._push;
		this._onEvent = onEvent;
	}

	async send(msg: movies.rpc.v1.IRequest) {
		const id = this._next_id;
		this._next_id += 1;

		const payload = movies.rpc.v1.Request.encode({...msg, id}).finish();

		return new Promise<movies.rpc.v1.Response>((sink) => {
			this._awaiting.set(id, sink);
			this._pull.send(payload);
		});
	}

	_handle(msg: Uint8Array) {
		const response = movies.rpc.v1.Response.decode(new Uint8Array(msg));
		const cb = this._awaiting.get(response.id);
		if (cb) {
			this._awaiting.delete(response.id);
			cb(response);
		} else {
			console.error('Unhandled', response);
		}
	}

	_onevent(msg: Uint8Array) {
		const event = movies.rpc.v1.Event.decode(new Uint8Array(msg));
		console.log(event);
		if (this._onEvent)
			this._onEvent(event);
	}
};
