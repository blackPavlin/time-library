import server from '../src/server';
import Tasks from '../src/Models/task.model';
import * as database from './helpers/database';
import * as auth from './helpers/auth';
import * as task from './helpers/task';

const testLogin = 'admin@admin.com';
let taskId = '';

describe('Тест CRUD карточек', () => {
	beforeAll(async () => {
		await server.ready();
		await database.connect();
	});

	beforeEach(async () => {
		const [testTask] = await Tasks.insertMany(task.getTasks(testLogin));
		taskId = testTask._id ?? '';
	});

	afterEach(async () => {
		await Tasks.deleteMany({});
	});

	afterAll(async () => {
		await server.close();
		await database.closeDatabase();
		await server.close();
	});

	it('Получение списка карточек', async () => {
		const token = auth.createToken({ login: testLogin }, server.config.SECRET_KEY);

		const { statusCode, payload } = await server.inject({
			method: 'GET',
			url: '/api/task/',
			payload: {},
			headers: {
				authorization: `Bearer ${token}`,
			},
		});

		expect(statusCode).toBe(200);
	});

	it('Добавление валидной карточки', async () => {
		const token = auth.createToken({ login: testLogin }, server.config.SECRET_KEY);

		const { statusCode, payload } = await server.inject({
			method: 'POST',
			url: '/api/task/',
			payload: {
				user: testLogin,
				title: 'Test insert title',
				description: 'Test insert description',
				whatWatch: 'serial',
				time: 4 * 60 * 1000,
				tags: ['insert', 'test'],
				completed: false,
			},
			headers: {
				authorization: `Bearer ${token}`,
			},
		});

		expect(statusCode).toBe(201);
	});

	it('Редактирование карточки', async () => {
		const token = auth.createToken({ login: testLogin }, server.config.SECRET_KEY);

		const { statusCode, payload } = await server.inject({
			method: 'PUT',
			url: `/api/task/${taskId}`,
			payload: {
				user: testLogin,
				title: 'Test update title',
				completed: false,
			},
			headers: {
				authorization: `Bearer ${token}`,
			},
		});

		expect(statusCode).toBe(204);
	});

	it('Удаление карточки карточки', async () => {
		const token = auth.createToken({ login: testLogin }, server.config.SECRET_KEY);

		const { statusCode, payload } = await server.inject({
			method: 'DELETE',
			url: `/api/task/${taskId}`,
			payload: {},
			headers: {
				authorization: `Bearer ${token}`,
			},
		});

		expect(statusCode).toBe(200);
		expect(JSON.parse(payload)).toStrictEqual({
			message: 'Task succesfull remove',
		});
	});
});
