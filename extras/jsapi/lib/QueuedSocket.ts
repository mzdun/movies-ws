export class QueuedSocket {
	private _handler: (ev: MessageEvent) => void;
	private _url: string;
	private _protocol: string;
	private _ws: WebSocket;
	private _connected = false;
	private _reconnecting: boolean;
	private _restarting?: number;
	private _retries = 0;
	private _queue: Array<Uint8Array> = [];
	peer?: QueuedSocket = undefined;

	constructor(
	    handler: (ev: MessageEvent) => void, reconnecting: boolean, url: string,
	    protocol: string) {
		this._handler = handler;
		this._reconnecting = reconnecting;
		this._url = url;
		this._protocol = protocol;
		this._restarting = undefined;
		this._ws = new WebSocket(this._url, this._protocol);
		this._setupConnection();
	}

	get url() {
		return this._url;
	}

	get proto() {
		return this._protocol;
	}

	get connected() {
		return this._connected;
	}

	send(payload: Uint8Array) {
		if (!this._connected) {
			this._queue.push(payload);
			return;
		}
		this._ws.send(payload);
	}

	private _setupConnection() {
		console.log(this._url, this._protocol);
		this._ws.binaryType = 'arraybuffer';
		this._ws.onopen = () => this._onopen();
		this._ws.onclose = () => this._onclose();
		this._ws.onmessage = (ev: MessageEvent) => this._handler(ev);
	}

	private _onopen() {
		this._connected = true;
		console.log(`[${this.proto}@${this.url}] connected`);

		if (this._restarting) {
			clearTimeout(this._restarting);
			this._restarting = undefined;
			if (this.peer && !this.peer.connected)
				this.peer._reconnect();
		}
		this._retries = 0;

		const queue = this._queue;
		this._queue = [];
		queue.forEach((payload) => this._ws.send(payload));
	}

	private _onclose() {
		this._connected = false;
		this._tryReconnecting();
	}

	private _tryReconnecting() {
		if (this._connected || !this._reconnecting)
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
		this._ws = new WebSocket(this._url, this._protocol);
		this._setupConnection();
	}
};