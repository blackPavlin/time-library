import mongoose from 'mongoose';
import server from './server';

void (async function (): Promise<void> {
	try {
		await server.ready();

		await mongoose.connect(server.config.MONGO_URL);
		await server.listen(server.config.PORT, server.config.HOST);
	} catch (error) {
		console.log(error);
	}
})();
