import axios, { AxiosHeaders } from 'axios';
export class HttpClient {
    static headers = new AxiosHeaders();
    static requestInterceptor = {};
    static responseInterceptor = {};
    _axiosInstance;
    _headers = {};
    constructor(baseUrl) {
        axios.defaults.withCredentials = true;
        this._axiosInstance = axios.create({
            baseURL: baseUrl,
            withCredentials: true
        });
    }
    mergeHeaders(headers) {
        return { ...HttpClient.headers.toJSON(), ...this._headers, ...headers.toJSON() };
    }
    setHeaders(headers) {
        this._headers = { ...this._headers, ...headers };
    }
    getHeaders() {
        return this._headers;
    }
    getHeadersMerged() {
        return this.mergeHeaders(HttpClient.headers);
    }
    createRequestInterceptor(onFullfilled, onRejected) {
        this._axiosInstance.interceptors.request.use(onFullfilled, onRejected);
    }
    createResponseInterceptor(onFullfilled, onRejected) {
        this._axiosInstance.interceptors.response.use(onFullfilled, onRejected);
    }
    getAxiosInstance() {
        return this._axiosInstance;
    }
    async request(url, config = {}) {
        this.createRequestInterceptor(HttpClient.requestInterceptor.onFullfilled, HttpClient.requestInterceptor.onRejected);
        this.createResponseInterceptor(HttpClient.responseInterceptor.onFullfilled, HttpClient.responseInterceptor.onRejected);
        config.url = url;
        config.headers = this.mergeHeaders((config.headers ?? new AxiosHeaders()));
        return await this._axiosInstance.request(config);
    }
    async get(url, config = {}) {
        return await this.request(url, { ...config, method: 'GET' });
    }
    async post(url, data, config = {}) {
        return await this.request(url, {
            ...config,
            method: 'POST',
            data
        });
    }
    async put(url, data, config = {}) {
        return await this.request(url, { ...config, method: 'PUT', data });
    }
    async patch(url, data, config = {}) {
        return await this.request(url, {
            ...config,
            method: 'PATCH',
            data
        });
    }
    async delete(url, config = {}) {
        return await this.request(url, { ...config, method: 'DELETE' });
    }
}
