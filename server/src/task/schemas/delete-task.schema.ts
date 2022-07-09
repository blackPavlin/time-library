export const DeleteTaskSchema = {
	params: {
		type: 'object',
		required: ['id'],
		properties: {
			id: { type: 'string' },
		},
	},
	response: {
		200: {
			type: 'object',
			required: ['success'],
			properties: {
				success: { type: 'boolean' },
			},
		},
	},
} as const;
