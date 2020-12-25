import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskDocument } from './schemas/task.schema';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  public async getAllTask(userID: string): Promise<TaskDocument[]> {
    return await this.taskModel.find({ user: userID }).exec();
  }

  public async getOneTask(
    userID: string,
    taskID: string,
  ): Promise<TaskDocument> {
    return await this.taskModel.findOne({ user: userID, _id: taskID });
  }

  public async createTask(
    userID: string,
    task: CreateTaskDto,
  ): Promise<TaskDocument> {
    const createdTask = new this.taskModel({ ...task, ...{ user: userID } });
    return await createdTask.save();
  }
}
