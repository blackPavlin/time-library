import jwt, { SignOptions } from 'jsonwebtoken';
import { TokenData } from '../../src/Controllers/auth.controller';

export const createToken = (
	payload: TokenData,
	secretKey: string,
	options?: SignOptions,
): string => {
	return jwt.sign(payload, secretKey, options);
};
