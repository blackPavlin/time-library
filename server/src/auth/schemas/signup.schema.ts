export const SignupSchema = {
	body: {
		type: 'object',
		required: ['login', 'password'],
		properties: {
			login: { type: 'string' },
			password: { type: 'string' },
		},
	},
	response: {
		201: {
			type: 'object',
			required: ['success'],
			properties: {
				success: { type: 'boolean' },
			},
		},
	},
} as const;
