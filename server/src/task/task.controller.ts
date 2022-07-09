import { FastifyPluginCallback } from 'fastify';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import { GetTaskSchema } from './schemas/get-task.shcema';
import { CreateTaskSchema } from './schemas/create-task.schema';
import { UpdateTaskSchema } from './schemas/update-task.schema';
import { DeleteTaskSchema } from './schemas/delete-task.schema';
import Tasks from '../models/task.model';

const taskController: FastifyPluginCallback = (fastify, options, done): void => {
	const server = fastify.withTypeProvider<JsonSchemaToTsProvider>();

	server.addHook('preHandler', server.auth([server.verifyJWT]));

	server.get('/', { schema: GetTaskSchema }, async (request) => {
		const login = request.user.login;
		const tasks = await Tasks.find({ user: login }).lean();

		return { tasks };
	});

	server.post('/', { schema: CreateTaskSchema }, async (request) => {
		const login = request.user.login;
		await Tasks.create({ ...request.body, user: login });

		return { success: true };
	});

	server.put('/:id', { schema: UpdateTaskSchema }, async (request) => {
		const login = request.user.login;
		const id = request.params.id;
		const updates = request.body;

		const task = await Tasks.findOneAndUpdate({ _id: id, user: login }, updates).lean();

		if (!task) {
			throw server.httpErrors.notFound('Task not found');
		}

		return { task };
	});

	server.delete('/:id', { schema: DeleteTaskSchema }, async (request) => {
		const login = request.user.login;
		const id = request.params.id;

		await Tasks.deleteOne({ _id: id, user: login });

		return { success: true };
	});

	done();
};

export default taskController;
