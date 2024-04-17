import { BASE_URL, Routes } from '../consts';
import { AppRouter } from './router';

const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
};

const DEFAULT_ERROR = { reason: 'Что-то пошло не так' };

type FetchOptions = {
    method?: string;
    headers?: Record<string, string>;
    timeout?: number;
    data?: FormData | URLSearchParams | Record<string, string | number>;
};

type HTTPMethod = (url: string, options?: FetchOptions) => Promise<XMLHttpRequest>;

type HttpErrorBody = {
    reason: string;
};

export function createQueryParams(params: Record<string, any> = {}, arrayDelimiter = ',') {
    if (typeof params !== 'object') {
        throw new Error('Params must be object');
    }

    const queryString = Object.keys(params)
        .filter((key) => (Array.isArray(params[key]) ? params[key].length : params[key]))
        .map((key) => key + '=' + (Array.isArray(params[key]) ? params[key].join(arrayDelimiter) : params[key]))
        .join('&');
    return queryString && '?' + queryString;
}

export const handleErrorResponse = (response: XMLHttpRequest) => {
    const errorResponse: HttpErrorBody = response.response ? JSON.parse(response.response) : DEFAULT_ERROR;

    if (response.status >= 500) {
        AppRouter.go(Routes.ERROR);
        return;
    }

    if ([401, 409].includes(response.status)) {
        AppRouter.go(Routes.LOGIN);
        return;
    }

    if (errorResponse?.reason === 'User already in system') {
        AppRouter.go(Routes.MESSANGER);
        return;
    }
};

class HTTPTransport {
    _baseUrl: string;

    constructor(endpoint: string) {
        this._baseUrl = BASE_URL + endpoint;
    }

    get: HTTPMethod = (url, options = {}) => {
        return this.request(url, { ...options, method: METHODS.GET }, options.timeout);
    };

    post: HTTPMethod = (url, options = {}) => {
        return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
    };

    put: HTTPMethod = (url, options = {}) => {
        return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
    };

    delete: HTTPMethod = (url, options = {}) => {
        return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
    };

    request = (url: string, options: FetchOptions = {}, timeout = 5000): Promise<XMLHttpRequest> => {
        const { headers = {} as Headers, method, data } = options;
        const requestURL = this._baseUrl + url;

        return new Promise(function (resolve, reject) {
            if (!method) {
                reject('No method');
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === METHODS.GET;
            xhr.open(method, isGet && !!data ? `${requestURL}${createQueryParams(data)}` : requestURL);

            Object.keys(headers).forEach((key) => {
                // @ts-expect-error: Из-за того, что headers может быть пустым он преобразуется в {}
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = () => {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.timeout = timeout;
            xhr.ontimeout = reject;
            xhr.withCredentials = true;

            if (isGet || !data) {
                xhr.send();
            } else {
                xhr.send(data instanceof FormData ? data : JSON.stringify(data));
            }
        });
    };
}

export default HTTPTransport;
