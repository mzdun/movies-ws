import {MovieEventTarget} from './Event';
import {movies} from './proto/bundle';
import WsClient from './WsClient';

export class Service extends MovieEventTarget {
	_ws: WsClient;
	_onlangs: () => void;
	constructor(port: number) {
		super();
		this._ws =
		    new WsClient(port, (event) => this.dispatchEvent(event), false);
		const self = this;
		this._onlangs = () => self.updateLangs();
		window.addEventListener('languagechange', this._onlangs);
		this.updateLangs();
	}

	updateLangs() {
		(async () => {
			await this._ws.send(
			    {langChange: {langId: [...navigator.languages]}});
			this.dispatchEvent({message: 'languageChanged'});
		})();
	}

	async getConfig() {
		return (await this._ws.send({getConfig: {}})).getConfig || {};
	};

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
		const uri =
		    (await this._ws.send({getVideoFile: {key}})).getVideoFile?.uri;
		return uri === null ? undefined : uri;
	}
};

export {movies};
export * from './filters';
