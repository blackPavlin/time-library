import fastify from 'fastify';
import cors from '@fastify/cors';
import auth from '@fastify/auth';
import sensible from '@fastify/sensible';
import authDecorator, { authDecoratorName } from './decorators/auth.decorator';
import authController from './auth/auth.controller';
import taskController from './task/task.controller';

export const server = fastify({
	logger: {
		level: process.env.NODE_ENV === 'production' ? 'error' : 'info',
	},
	ignoreTrailingSlash: true,
});

// Plugins
server.register(cors, {
	origin: process.env.NODE_ENV !== 'production',
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
});
server.register(auth);
server.register(sensible);

// Decorators
server.decorate(authDecoratorName, authDecorator);

// Controllers
server.register(authController, { prefix: '/api/auth' });
server.register(taskController, { prefix: '/api/task' });
