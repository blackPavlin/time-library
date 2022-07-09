import { FastifyPluginCallback } from 'fastify';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { LoginSchema } from './schemas/login.schema';
import { SignupSchema } from './schemas/signup.schema';
import Users from '../models/user.model';

const authController: FastifyPluginCallback = (fastify, options, done): void => {
	const server = fastify.withTypeProvider<JsonSchemaToTsProvider>();

	server.post('/login', { schema: LoginSchema }, async (request) => {
		const { login, password } = request.body;

		const user = await Users.findOne({ login }).select({ login: 1, password: 1 }).lean();
		if (!user) {
			throw server.httpErrors.unauthorized('Invalid login or password');
		}

		if (!bcrypt.compareSync(password, user.password)) {
			throw server.httpErrors.unauthorized('Incorrect login or password');
		}

		const secretKey = process.env.SECRET_KEY ?? '';
		const expiresIn = process.env.EXPIRES_IN ?? '1h';

		const token = jwt.sign({ login: user.login }, secretKey, { expiresIn });

		return { token };
	});

	server.post('/signup', { schema: SignupSchema }, async (request) => {
		const { login, password } = request.body;

		const exists = await Users.exists({ login });
		if (exists) {
			throw server.httpErrors.conflict('User allready exists');
		}

		await Users.create({
			login,
			password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
		});

		return { success: true };
	});

	done();
};

export default authController;
