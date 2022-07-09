export const LoginSchema = {
	body: {
		type: 'object',
		required: ['login', 'password'],
		properties: {
			login: { type: 'string' },
			password: { type: 'string' },
		},
	},
	response: {
		200: {
			type: 'object',
			required: ['token'],
			properties: {
				token: { type: 'string' },
			},
		},
	},
} as const;
