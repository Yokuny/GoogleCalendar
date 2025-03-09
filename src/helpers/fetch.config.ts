import Cookies from 'js-cookie';

const API = process.env.NEXT_PUBLIC_API;

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';
type headersStructure = {
	method: Method;
	headers: { 'Content-Type': string; Authorization: string };
	body?: string;
	withCredentials: boolean;
};

type Response<T> = {
	success: boolean;
	data: T;
	message: string;
};

const FetchConfig = (body: Object, method: Method) => {
	const headers: headersStructure = {
		method: method,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${Cookies.get('auth')}`,
		},
		withCredentials: true,
		body: JSON.stringify(body),
	};

	if (method === 'GET' || method === 'DELETE') delete headers.body;

	return headers;
};

const POST = (body: Object) => FetchConfig(body, 'POST');
const PUT = (body: Object) => FetchConfig(body, 'PUT');
const GET = () => FetchConfig({}, 'GET');
const DELETE = () => FetchConfig({}, 'DELETE');

const request = async (path: string, config: headersStructure) => {
	const res = await fetch(`${API}${path}`, config);
	return res.json() as Promise<Response<any>>;
};

const requestWithoutToken = async (path: string) => {
	const res = await fetch(`${API}${path}`, { method: 'GET' });
	return res.json() as Promise<Response<any>>;
};

export { DELETE, GET, POST, PUT, request, requestWithoutToken };
