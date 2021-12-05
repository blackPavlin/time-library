import { LeanDocument } from 'mongoose';
import { Task } from '../../src/Models/task.model';

export const getTasks = (login: string): LeanDocument<Task>[] => {
	return [
		{
			user: login,
			title: 'Test title silm',
			description: 'Test description film',
			whatWatch: 'film',
			time: 60 * 1000,
			tags: ['test'],
			completed: false,
		},
		{
			user: login,
			title: 'Test title serial',
			description: 'Test description serial',
			whatWatch: 'serial',
			time: 60 * 1000,
			tags: ['test'],
			completed: true,
		},
	];
};
