export const GetTaskSchema = {
	response: {
		200: {
			type: 'object',
			required: ['tasks'],
			properties: {
				tasks: {
					type: 'array',
					items: {
						type: 'object',
						required: [
							'_id',
							'user',
							'title',
							'description',
							'whatWatch',
							'time',
							'tags',
							'completed',
						],
						properties: {
							_id: { type: 'string' },
							user: { type: 'string' },
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
				},
			},
		},
	},
} as const;
