import sinon, { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from 'sinon';
import { expect } from 'chai';
import HTTPTransport from './fetch';
import { BASE_URL } from '../consts';

describe('HTTPTransport test', () => {
    let xhr: SinonFakeXMLHttpRequestStatic;
    let httpTransport: HTTPTransport;
    let requests: SinonFakeXMLHttpRequest[] = [];

    beforeEach(() => {
        xhr = sinon.useFakeXMLHttpRequest();
        // @ts-expect-error особенности мока
        global.XMLHttpRequest = xhr;

        httpTransport = new HTTPTransport('');

        // eslint-disable-next-line @typescript-eslint/no-shadow
        xhr.onCreate = function (xhr) {
            requests.push(xhr);
        };
    });

    afterEach(() => {
        requests = [];
        xhr.restore();
    });
    it('should make GET request', () => {
        httpTransport.get('/');
        const [request] = requests;

        expect(request.method).to.equal('GET');
    });

    it('should make GET request with params', () => {
        httpTransport.get('/', { data: { arr: [1, 2, 3], str: 'string' } });
        const [request] = requests;

        expect(request.url).to.equal(BASE_URL + '/?arr=1,2,3&str=string');
    });

    it('should make POST request', () => {
        httpTransport.post('/');
        const [request] = requests;

        expect(request.method).to.equal('POST');
    });

    it('should make PUT request', () => {
        httpTransport.put('/');
        const [request] = requests;

        expect(request.method).to.equal('PUT');
    });

    it('should make DELETE request', () => {
        httpTransport.delete('/');
        const [request] = requests;

        expect(request.method).to.equal('DELETE');
    });
});
