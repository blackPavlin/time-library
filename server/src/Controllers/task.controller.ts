import { FastifyInstance, RegisterOptions } from 'fastify';
import { FromSchema } from 'json-schema-to-ts';

import {
	GetTaskSchema,
	CreateTaskSchema,
	UpdateTaskSchema,
	DeleteTaskSchema,
} from '../Schemas/task.schemas';
import Tasks from '../Models/task.model';

export default (
	server: FastifyInstance,
	options: RegisterOptions,
	next: (err?: Error) => void,
): void => {
	server.get(
		'/',
		{ schema: GetTaskSchema, preHandler: server.auth([server.verifyJWT]) },
		async (request, reply) => {
			const login = request.user.login;
			const tasks = await Tasks.find({ user: login }).lean();

			reply.code(200).send({ tasks });
		},
	);

	server.post<{ Body: FromSchema<typeof CreateTaskSchema.body> }>(
		'/',
		{ schema: CreateTaskSchema, preHandler: server.auth([server.verifyJWT]) },
		async (request, reply) => {
			const login = request.user.login;
			const createdTask = await Tasks.create({ ...request.body, user: login });

			reply.code(201).send({ task: createdTask });
		},
	);

	server.put<{
		Body: FromSchema<typeof UpdateTaskSchema.body>;
		Params: FromSchema<typeof UpdateTaskSchema.params>;
	}>(
		'/:id',
		{ schema: UpdateTaskSchema, preHandler: server.auth([server.verifyJWT]) },
		async (request, reply) => {
			const login = request.user.login;
			const id = request.params.id;
			const updates = request.body;

			const updatedTask = await Tasks.findOneAndUpdate({ _id: id, user: login }, updates, {
				new: true,
				lean: true,
			});

			if (!updatedTask) {
				throw server.httpErrors.notFound('Task not found');
			}

			reply.code(204).send({ task: updatedTask });
		},
	);

	server.delete<{ Params: FromSchema<typeof DeleteTaskSchema.params> }>(
		'/:id',
		{ schema: DeleteTaskSchema, preHandler: server.auth([server.verifyJWT]) },
		async (request, reply) => {
			const login = request.user.login;
			const id = request.params.id;

			await Tasks.remove({ _id: id, user: login });

			reply.code(200).send({ message: 'Task succesfull remove' });
		},
	);

	next();
};
