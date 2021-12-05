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
			required: ['task'],
			properties: {
				task: {
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
} as const;

export const UpdateTaskSchema = {
	params: {
		type: 'object',
		required: ['id'],
		properties: {
			id: { type: 'string' },
		},
	},
	body: {
		type: 'object',
		oneOf: [
			{
				required: ['title', 'description'],
				properties: {
					title: { type: 'string' },
					description: { type: 'string' },
				},
			},
			{
				required: ['completed'],
				properties: {
					completed: { type: 'boolean' },
				},
			},
		],
	},
	response: {
		204: {
			type: 'object',
			required: ['task'],
			properties: {
				task: {
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
} as const;

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
			required: ['message'],
			properties: {
				message: { type: 'string' },
			},
		},
	},
} as const;
