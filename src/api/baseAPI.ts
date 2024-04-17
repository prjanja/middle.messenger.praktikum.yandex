import HTTPTransport from '../utils/fetch';

export class BaseAPI {
    _fetch: HTTPTransport;

    constructor(baseUrl: string) {
        this._fetch = new HTTPTransport(baseUrl);
    }
}
