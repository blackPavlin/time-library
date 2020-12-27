import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskDocument } from './schemas/task.schema';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  public async getAllTask(userID: string): Promise<TaskDocument[]> {
    return await this.taskModel.find({ user: userID }).exec();
  }

  public async createTask(
    userID: string,
    task: CreateTaskDto,
  ): Promise<TaskDocument> {
    const createdTask = new this.taskModel({ ...task, user: userID });
    return await createdTask.save();
  }

  public async updateTask(
    userID: string,
    taskID: string,
    task: UpdateTaskDto,
  ): Promise<TaskDocument> {
    return await this.taskModel.findOneAndUpdate(
      {
        _id: taskID,
      },
      {
        ...task,
        user: userID,
      },
      {
        new: true,
      },
    );
  }

  public async deleteTask(userID: string, taskID: string) {
    return await this.taskModel.remove({ _id: taskID, user: userID });
  }
}
