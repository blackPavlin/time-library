import * as database from './helpers/database';
import server from '../src/server';

const testLogin = 'admin@admin.com';
const testPassword = 'admin';

describe('Тест авторизации', () => {
	beforeAll(async () => {
		await server.ready();
		await database.connect();
	});

	afterAll(async () => {
		await server.close();
		await database.closeDatabase();
		await server.close();
	});

	it('Вход без указания логина и пароля', async () => {
		const { statusCode } = await server.inject({
			method: 'POST',
			url: '/api/auth/login',
			payload: {},
		});

		expect(statusCode).toBe(400);
	});

	it('Вход с некорректным логином', async () => {
		const { statusCode, payload } = await server.inject({
			method: 'POST',
			url: '/api/auth/login',
			payload: {
				login: '123@admin.com',
				password: testPassword,
			},
		});

		expect(statusCode).toBe(401);
		expect(JSON.parse(payload)).toStrictEqual({
			statusCode: 401,
			error: 'Unauthorized',
			message: 'Incorrect login or password',
		});
	});

	it('Вход с некорректным паролем', async () => {
		const { statusCode, payload } = await server.inject({
			method: 'POST',
			url: '/api/auth/login',
			payload: {
				login: testLogin,
				password: '1234',
			},
		});

		expect(statusCode).toBe(401);
		expect(JSON.parse(payload)).toStrictEqual({
			statusCode: 401,
			error: 'Unauthorized',
			message: 'Incorrect login or password',
		});
	});

	it('Регистрация без указания логина и пароля', async () => {
		const { statusCode } = await server.inject({
			method: 'POST',
			url: '/api/auth/signup',
			payload: {},
		});

		expect(statusCode).toBe(400);
	});

	it('Регистрация пользователя', async () => {
		const { statusCode, payload } = await server.inject({
			method: 'POST',
			url: '/api/auth/signup',
			payload: {
				login: testLogin,
				password: testPassword,
			},
		});

		expect(statusCode).toBe(201);
		expect(JSON.parse(payload)).toStrictEqual({
			message: 'User created successfully',
		});
	});

	it('Повторная регистрация пользователя', async () => {
		const { statusCode, payload } = await server.inject({
			method: 'POST',
			url: '/api/auth/signup',
			payload: {
				login: testLogin,
				password: testPassword,
			},
		});

		expect(statusCode).toBe(409);
		expect(JSON.parse(payload)).toStrictEqual({
			statusCode: 409,
			error: 'Conflict',
			message: 'User already exists',
		});
	});

	it('Вход в аккаунт', async () => {
		const response = await server.inject({
			method: 'POST',
			url: '/api/auth/login',
			payload: {
				login: testLogin,
				password: testPassword,
			},
		});

		const payload: { token: string } = JSON.parse(response.payload);

		expect(response.statusCode).toBe(200);
		expect(payload.token).toBeDefined();
	});

	it('Запрос к защищённому роуту без токена', async () => {
		const response = await server.inject({
			method: 'GET',
			url: '/api/task/',
			payload: {},
			headers: {},
		});

		expect(response.statusCode).toBe(401);
	});

	it('Запрос к защищённому роуту с невалидным токеном', async () => {
		const response = await server.inject({
			method: 'GET',
			url: '/api/task/',
			payload: {},
			headers: {
				authorization: 'test',
			},
		});

		expect(response.statusCode).toBe(401);
	});

	it('Запрос к защищённому роуту с действительным токеном', async () => {
		const response = await server.inject({
			method: 'GET',
			url: '/api/task/',
			payload: {},
			headers: {
				authorization: 'test',
			},
		});
	});
});
