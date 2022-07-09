export const CreateTaskSchema = {
	body: {
		type: 'object',
		required: ['title', 'whatWatch', 'time', 'tags', 'completed'],
		properties: {
			title: { type: 'string' },
			description: { type: 'string' },
			whatWatch: {
				type: 'string',
				enum: ['film', 'serial'],
			},
			time: { type: 'number' },
			tags: {
				type: 'array',
				items: { type: 'string' },
			},
			completed: { type: 'boolean' },
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
