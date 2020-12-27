import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserID } from 'src/user/user.decorator';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
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
  @Post('/')
  async createTask(
    @UserID() userID: string,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<TaskDocument> {
    return this.taskService.createTask(userID, createTaskDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:taskID')
  async updateTask(
    @UserID() userID: string,
    @Param('taskID') taskID: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskDocument> {
    return this.taskService.updateTask(userID, taskID, updateTaskDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:taskID')
  async deleteTask(
    @UserID() userID: string,
    @Param('taskID') taskID: string,
  ): Promise<any> {
    return this.taskService.deleteTask(userID, taskID);
  }
}
