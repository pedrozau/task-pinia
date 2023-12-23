import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDTO } from './DTO/task.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  
  @Post()
  @UseGuards(AuthGuard)
  createTask(@Body() data:TaskDTO) {
     return this.taskService.create(data)
  }
  
  @Get()
  @UseGuards(AuthGuard)
  getTasks() {
    return this.taskService.getTasks()
  }
  
  @Get(':id')
  @UseGuards(AuthGuard)
  getById(@Param('id') id:string) {
    return this.taskService.getById(id)
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  delete(@Param() id:string) {
      return this.taskService.deleteById(id)
  }
  
  @Put(':id')
  @UseGuards(AuthGuard)
  update(@Param() id:string,@Body() data:TaskDTO) {
     return this.taskService.update(data,id)
  }
  
  


}
