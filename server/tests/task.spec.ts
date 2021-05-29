import * as database from './helpers/database';
import server from '../src/server';

const testLogin = 'admin@admin.com';
const testPassword = 'admin';

describe('Тест CRUD модели task', () => {
	beforeAll(async () => {
		await server.ready();
		await database.connect();
	});

	afterAll(async () => {
		await server.close();
		await database.closeDatabase();
	});
});
