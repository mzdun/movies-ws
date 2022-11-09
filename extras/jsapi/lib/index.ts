import {MovieEventTarget} from './Event';
import {movies} from './proto/bundle';
import WsClient from './WsClient';

export class Service extends MovieEventTarget {
	_ws: WsClient;
	_lang: string;
	_onlangs: () => void;
	constructor(port: number) {
		super();

		this._ws =
		    new WsClient(port, (event) => this.dispatchEvent(event), false);

		this._lang = navigator.language;
		console.log('lang equals to', this._lang);

		const self = this;
		this._onlangs = () => self.updateLangs();
		window.addEventListener('languagechange', this._onlangs);

		this.updateLangs();
	}

	get lang() {
		return this._lang;
	}

	updateLangs() {
		(async () => {
			const nextLang = (await this._ws.send({
				                 langChange: {langId: [...navigator.languages]}
			                 })).langChange?.langId ||
			    '';
			const langChanged = nextLang !== this._lang;
			this._lang = nextLang;
			if (langChanged) {
				console.log('lang changed to', this._lang);
				this.dispatchEvent({message: 'languageChanged'});
			} else {
				console.log('lang still equals to', this._lang);
			}
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
