import axios, {
	AxiosInstance,
	AxiosHeaders,
	AxiosRequestConfig,
	InternalAxiosRequestConfig,
	RawAxiosRequestHeaders,
	AxiosResponse,
	AxiosError
} from 'axios';
import { RequestInterceptor, ResponseInterceptor } from './types';

export type RawRequestHeaders = RawAxiosRequestHeaders;
export type Headers = AxiosHeaders;
export type RequestConfig<D = any> = AxiosRequestConfig<D>;
export type Error<T = unknown, D = any> = AxiosError<T, D>;

export class HttpClient {
	public static headers: Headers = new AxiosHeaders();
	public static requestInterceptor: RequestInterceptor = {};
	public static responseInterceptor: ResponseInterceptor = {};
	private _axiosInstance: AxiosInstance;
	private _headers: RawRequestHeaders = {};

	constructor(baseUrl: string) {
		axios.defaults.withCredentials = true
		this._axiosInstance = axios.create({
			baseURL: baseUrl,
			withCredentials: true
		});
	}

	private mergeHeaders(headers: AxiosHeaders): RawRequestHeaders {
		return {...HttpClient.headers.toJSON(), ...this._headers, ...headers.toJSON()};
	}

	setHeaders(headers: RawRequestHeaders) {
		this._headers = { ...this._headers, ...headers };
	}

	getHeaders(): any {
		return this._headers;
	}

	getHeadersMerged(): RawRequestHeaders {
		return this.mergeHeaders(HttpClient.headers);
	}

	createRequestInterceptor(
		onFullfilled?: (
			value: InternalAxiosRequestConfig<any>
		) => InternalAxiosRequestConfig<any> | Promise<InternalAxiosRequestConfig<any>>,
		onRejected?: (error: any) => any
	) {
		this._axiosInstance.interceptors.request.use(onFullfilled, onRejected);
	}

	createResponseInterceptor(
		onFullfilled?: (value: AxiosResponse<any, any>) => AxiosResponse<any, any> | Promise<AxiosResponse<any, any>>,
		onRejected?: (error: any) => any
	) {
		this._axiosInstance.interceptors.response.use(onFullfilled, onRejected);
	}

	getAxiosInstance() {
		return this._axiosInstance;
	}

	async request<T = any, R = T>(url: string, config: RequestConfig<R> = {}) {
		this.createRequestInterceptor(HttpClient.requestInterceptor.onFullfilled, HttpClient.requestInterceptor.onRejected);
		this.createResponseInterceptor(
			HttpClient.responseInterceptor.onFullfilled,
			HttpClient.responseInterceptor.onRejected
		);
		config.url = url;
		config.headers = this.mergeHeaders((config.headers ?? new AxiosHeaders()) as AxiosHeaders);

		return await this._axiosInstance.request<T, AxiosResponse<T, R>>(config);
	}

	async get<T = any, R = T>(url: string, config: RequestConfig<R> = {}) {
		return await this.request<T, R>(url, { ...config, method: 'GET' });
	}

	async post<T = any, R = T>(url: string, data?: R, config: RequestConfig<R> = {}) {
		return await this.request<T, R>(url, {
			...config,
			method: 'POST',
			data
		});
	}

	async put<T = any, R = T>(url: string, data: R, config: RequestConfig<R> = {}) {
		return await this.request<T, R>(url, { ...config, method: 'PUT', data });
	}

	async patch<T = any, R = T>(url: string, data: R, config: RequestConfig<R> = {}) {
		return await this.request<T, R>(url, {
			...config,
			method: 'PATCH',
			data
		});
	}

	async delete<T = any, R = T>(url: string, config: RequestConfig<R> = {}) {
		return await this.request(url, { ...config, method: 'DELETE' });
	}
}
