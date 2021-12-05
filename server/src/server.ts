import path from 'path';
import fastify from 'fastify';
import fastifyCors from 'fastify-cors';
import fastifySensible from 'fastify-sensible';
import fastifyAuth from 'fastify-auth';
import fastifyEnv from 'fastify-env';

import configSchema from './Config';
import authPlugin from './Plugins/auth.plugin';
import authController from './Controllers/auth.controller';
import taskController from './Controllers/task.controller';

const server = fastify({
	logger: {
		level: 'error',
	},
	ignoreTrailingSlash: true,
});

server
	.register(fastifyCors, { origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE'] })
	.register(fastifySensible)
	.register(fastifyAuth)
	.register(fastifyEnv, {
		schema: configSchema,
		dotenv: { path: path.join(__dirname, '../env/local.config.env') },
	})
	.after(() => {
		server
			.register(authPlugin)
			.register(authController, { prefix: '/api/auth' })
			.register(taskController, { prefix: '/api/task' });
	});

export default server;
