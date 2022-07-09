import path from 'path';
import { envSchema } from 'env-schema';

export interface Config {
	NODE_ENV: 'production' | 'development';
	MONGO_URL: string;
	SECRET_KEY: string;
	EXPIRES_IN: number;
	PORT: number;
	HOST: string;
}

const configSchema = {
	type: 'object',
	required: ['MONGO_URL', 'SECRET_KEY', 'PORT'],
	properties: {
		NODE_ENV: { type: 'string', enum: ['production', 'development'], default: 'development' },
		MONGO_URL: { type: 'string' },
		SECRET_KEY: { type: 'string' },
		EXPIRES_IN: { type: 'string' },
		PORT: { type: 'number' },
		HOST: { type: 'string', default: '127.0.0.1' },
	},
};

export const config = envSchema<Config>({
	schema: configSchema,
	dotenv: {
		path: path.join(__dirname, '..', '..', 'env', 'local.config.env'),
	},
});
