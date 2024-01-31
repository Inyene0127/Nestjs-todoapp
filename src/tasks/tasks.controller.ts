import { Controller, Get, Post, Patch, Delete, Query, Body, Param, UsePipes, ValidationPipe, ParseIntPipe, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
;
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { UpdateTaskStatusValidation } from './pipe/update-task.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService:TasksService){}

    @Get()
    getAllTask(){
        return this.tasksService.getAllTask()
    }


    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe)  id:number): Promise<Task>{
        return this.tasksService.getTaskById(id)
    }

    
    @Post()
    @UsePipes(ValidationPipe)
    createTask(
    @Body() createTaskDto: CreateTaskDto,        
    ): Promise<Task>{
        return this.tasksService.createTask(createTaskDto);          
    }

    @Delete(':id')
    deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void>{
        return this.tasksService.deleteTask(id);
    }
    @Put('/:id')
    @UsePipes(ValidationPipe)
    updateTask(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateTaskDto:UpdateTaskDto): Promise<Task>{
        return this.tasksService.updateTask(id, updateTaskDto)
    }
    // @Get()
    // filterTask(@Query(ValidationPipe) filterTaskDto:FilterTaskDto): Promise<Task[]>{
    //     return this.tasksService.getAllTask(filterTaskDto)
    // }

}
    // @Get()
    // filterTask(@Query(ValidationPipe) filterTaskDto:FilterTaskDto): Task[]{
    //     if (Object.keys(filterTaskDto).length){
    //         return this.tasksService.filterTask(filterTaskDto);
    //     }
    //     else{
    //         return this.tasksService.getAllTasks()
    //     }
    // }
    // @Patch('/:id/status')
    // updateTask(
    // @Param('id') id: string, 
    // @Body('status', UpdateTaskStatusValidation ) status: TaskStatus): Task{
    //     return this.tasksService.updateTask(id, status)
    // }





    // // @Patch()
    // // updateTask(){

    // // }

    // // @Delete()
    // // deleteTask(){

    // // }

   

