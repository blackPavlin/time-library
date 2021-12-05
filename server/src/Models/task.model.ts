import { model, Schema, Document } from 'mongoose';

export interface Task extends Document {
	user: string;
	title: string;
	description: string;
	whatWatch: 'film' | 'serial';
	time: number;
	tags: string[];
	completed: boolean;
}

const taskSchema = new Schema<Task>(
	{
		user: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		whatWatch: {
			type: String,
			required: true,
			enum: ['film', 'serial'],
		},
		time: {
			type: Number,
			required: true,
		},
		tags: [
			{
				type: String,
			},
		],
		completed: {
			type: Boolean,
			default: false,
		},
	},
	{
		versionKey: false,
	},
);

taskSchema.index({ user: 1 });

export default model<Task>('tasks', taskSchema);
