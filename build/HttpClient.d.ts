import { AxiosInstance, AxiosHeaders, AxiosRequestConfig, InternalAxiosRequestConfig, RawAxiosRequestHeaders, AxiosResponse, AxiosError } from 'axios';
import { RequestInterceptor, ResponseInterceptor } from './types';
export type RawRequestHeaders = RawAxiosRequestHeaders;
export type Headers = AxiosHeaders;
export type RequestConfig<D = any> = AxiosRequestConfig<D>;
export type Error<T = unknown, D = any> = AxiosError<T, D>;
export declare class HttpClient {
    static headers: Headers;
    static requestInterceptor: RequestInterceptor;
    static responseInterceptor: ResponseInterceptor;
    private _axiosInstance;
    private _headers;
    constructor(baseUrl: string);
    private mergeHeaders;
    setHeaders(headers: RawRequestHeaders): void;
    getHeaders(): any;
    getHeadersMerged(): RawRequestHeaders;
    createRequestInterceptor(onFullfilled?: (value: InternalAxiosRequestConfig<any>) => InternalAxiosRequestConfig<any> | Promise<InternalAxiosRequestConfig<any>>, onRejected?: (error: any) => any): void;
    createResponseInterceptor(onFullfilled?: (value: AxiosResponse<any, any>) => AxiosResponse<any, any> | Promise<AxiosResponse<any, any>>, onRejected?: (error: any) => any): void;
    getAxiosInstance(): AxiosInstance;
    request<T = any, R = T>(url: string, config?: RequestConfig<R>): Promise<AxiosResponse<T, R>>;
    get<T = any, R = T>(url: string, config?: RequestConfig<R>): Promise<AxiosResponse<T, R>>;
    post<T = any, R = T>(url: string, data?: R, config?: RequestConfig<R>): Promise<AxiosResponse<T, R>>;
    put<T = any, R = T>(url: string, data: R, config?: RequestConfig<R>): Promise<AxiosResponse<T, R>>;
    patch<T = any, R = T>(url: string, data: R, config?: RequestConfig<R>): Promise<AxiosResponse<T, R>>;
    delete<T = any, R = T>(url: string, config?: RequestConfig<R>): Promise<AxiosResponse<any, R>>;
}
