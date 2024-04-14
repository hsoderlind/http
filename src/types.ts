import { InternalAxiosRequestConfig, AxiosResponse } from 'axios';

export interface RequestInterceptor {
	onFullfilled?: (
		value: InternalAxiosRequestConfig<any>
	) => InternalAxiosRequestConfig<any> | Promise<InternalAxiosRequestConfig<any>>;
	onRejected?: (error: any) => any;
}

export interface ResponseInterceptor {
	onFullfilled?: (value: AxiosResponse<any, any>) => AxiosResponse<any, any> | Promise<AxiosResponse<any, any>>;
	onRejected?: (error: any) => any;
}
