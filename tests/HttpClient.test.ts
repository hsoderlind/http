import MockAdapter from 'axios-mock-adapter';
import { HttpClient } from '../src/HttpClient';

describe('HttpClient tests', () => {
	let httpClient: HttpClient;
	let axiosMock: MockAdapter;

	beforeEach(() => {
		httpClient = new HttpClient('https://example.com');
		axiosMock = new MockAdapter(httpClient.getAxiosInstance());
	});

	afterEach(() => {
		axiosMock.restore();
	});

	it('should create an axios instance', () => {
		expect(httpClient.getAxiosInstance()).toBeDefined();
	});

	it('should set headers', () => {
		httpClient.setHeaders({ 'Content-Type': 'application/json' });
		expect(httpClient.getHeaders()).toEqual({ 'Content-Type': 'application/json' });
	});

	it('should get merged headers', () => {
		httpClient.setHeaders({ 'Content-Type': 'application/json' });
		expect(httpClient.getHeadersMerged()).toEqual({ 'Content-Type': 'application/json' });
	});

	it('should return response code 200', async () => {
		axiosMock.onGet('/').reply((config) => {
			console.log(config.headers)
			return [200, { message: 'OK' }];
		});
		httpClient.setHeaders({ 'Content-Type': 'application/json' , 'Accept': 'application/json'});
		const response = await httpClient.get('/');
		expect(response.status).toBe(200);
	});
});
