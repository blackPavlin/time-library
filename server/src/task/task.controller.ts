import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserID } from 'src/user/user.decorator';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskDocument } from './schemas/task.schema';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getTasks(@UserID() userID: string): Promise<TaskDocument[]> {
    return this.taskService.getAllTask(userID);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getTask(
    @UserID() userID: string,
    @Param('id') taskID: string,
  ): Promise<TaskDocument> {
    return this.taskService.getOneTask(userID, taskID);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async createTask(
    @UserID() userID: string,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<TaskDocument> {
    return this.taskService.createTask(userID, createTaskDto);
  }
}
