export class QueuedSocket {
	private _handler: (ev: MessageEvent) => void;
	private _connChanged: () => void;
	private _url: string;
	private _ws: WebSocket;
	private _connected = false;
	private _connecting = true;
	private _restarting?: number;
	private _retries = 0;
	private _queue: Array<Uint8Array> = [];

	constructor(
	    handler: (ev: MessageEvent) => void, connChanged: () => void,
	    url: string) {
		this._handler = handler;
		this._connChanged = connChanged;
		this._url = url;
		this._restarting = undefined;
		this._ws = new WebSocket(this._url);
		this._setupConnection();
	}

	get url() {
		return this._url;
	}

	get connected() {
		return this._connected;
	}

	send(payload: Uint8Array) {
		if (!this._connected) {
			this._queue.push(payload);
			if (!this._connecting)
				this._reconnect();
			return;
		}
		this._ws.send(payload);
	}

	private _setupConnection() {
		this._ws.binaryType = 'arraybuffer';
		this._ws.onopen = () => this._onopen();
		this._ws.onclose = () => this._onclose();
		this._ws.onmessage = (ev: MessageEvent) => this._handler(ev);
	}

	private _onopen() {
		this._connected = true;
		this._connecting = false;
		console.log(`[${this.url}] connected`);

		if (this._restarting) {
			clearTimeout(this._restarting);
			this._restarting = undefined;
		}
		this._retries = 0;

		const queue = this._queue;
		this._queue = [];
		queue.forEach((payload) => this._ws.send(payload));
		this._connChanged();
	}

	private _onclose() {
		this._connected = false;
		this._connecting = false;
		this._tryReconnecting();
		this._connChanged();
	}

	private _tryReconnecting() {
		if (this._connected)
			return;
		// Exponentially increase timeout to reconnect.
		// Respectfully copied from the package webpack-dev-server, which got it
		// from package `got`.
		const retryInMs =
		    1000 * Math.pow(2, this._retries) + Math.random() * 100;
		this._retries += 1;
		this._restarting =
		    Number(setTimeout(() => this._reconnect(), retryInMs));
	}

	private _reconnect() {
		this._connecting = true;
		this._ws = new WebSocket(this._url);
		this._setupConnection();
	}
};