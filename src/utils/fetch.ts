const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
};

type FetchOptions = {
    method?: string;
    headers?: Headers;
    timeout?: number;
    data?: FormData | URLSearchParams;
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

class HTTPTransport {
    get = (url: string, options: FetchOptions = {}) => {
        return this.request(url, { ...options, method: METHODS.GET }, options.timeout);
    };

    post = (url: string, options: FetchOptions = {}) => {
        return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
    };

    put = (url: string, options: FetchOptions = {}) => {
        return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
    };

    delete = (url: string, options: FetchOptions = {}) => {
        return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
    };

    request = (url: string, options: FetchOptions = {}, timeout = 5000) => {
        const { headers = {}, method, data } = options;

        return new Promise(function (resolve, reject) {
            if (!method) {
                reject('No method');
                return;
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === METHODS.GET;

            xhr.open(method, isGet && !!data ? `${url}${createQueryParams(data)}` : url);

            Object.keys(headers).forEach((key) => {
                // @ts-ignore
                xhr.setRequestHeader(key, headers[key]);
            });

            xhr.onload = function () {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.timeout = timeout;
            xhr.ontimeout = reject;

            if (isGet || !data) {
                xhr.send();
            } else {
                xhr.send(data);
            }
        });
    };
}

export default HTTPTransport;
