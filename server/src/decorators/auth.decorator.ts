import { FastifyAuthFunction } from '@fastify/auth';
import jwt from 'jsonwebtoken';

declare module 'fastify' {
	export interface FastifyInstance {
		verifyJWT(): void;
	}

	export interface FastifyRequest {
		user: TokenPayload;
	}
}

export interface TokenPayload {
	login: string;
}

export const authDecoratorName = 'verifyJWT' as const;

const verifyJWT: FastifyAuthFunction = (request, reply, done): void => {
	const bearer = request.headers?.authorization;
	if (!bearer) {
		return done(new Error('Invalid auth token'));
	}

	const [, token] = bearer.split(' ');
	if (!token) {
		return done(new Error('Invalid auth token'));
	}

	const secretKey = process.env.SECRET_KEY ?? '';

	jwt.verify(token, secretKey, (error, decodet) => {
		if (error || !decodet) {
			return done(new Error('Invalid auth token'));
		}

		request.user = {
			login: (decodet as TokenPayload).login,
		};

		done();
	});
};

export default verifyJWT;
