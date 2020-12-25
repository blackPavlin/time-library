import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserID } from 'src/user/user.decorator';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async getTasks(@UserID() userID: string) {
    return this.taskService.getAllTask(userID);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getTask(@UserID() userID: string, @Param('id') taskID: string) {
    return this.taskService.getOneTask(userID, taskID);
  }
}
