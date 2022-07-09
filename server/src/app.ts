import mongoose from 'mongoose';
import { config } from './config/config';
import { server } from './server';

void (async function main(): Promise<void> {
	try {
		await mongoose.connect(config.MONGO_URL);
		await server.listen({ host: config.HOST, port: config.PORT });
	} catch (error) {
		console.log(error);
	}
})();
