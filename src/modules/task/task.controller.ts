import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDTO } from './DTO/task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  
  @Post()
  createTask(@Body() data:TaskDTO) {
     return this.taskService.create(data)
  }
  
  @Get(':id')
  getById(@Param('id') id:string) {
    return this.taskService.getById(id)
  }

  @Delete(':id')
  delete(@Param() id:string) {
      return this.taskService.deleteById(id)
  }
  
  @Put(':id')
  update(@Param() id:string,@Body() data:TaskDTO) {
     return this.taskService.update(data,id)
  }
  
  


}
