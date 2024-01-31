import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { CustomTaskRepository } from './task.repository';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskStatus } from './task-status.enum';
import { title } from 'process';
import { UpdateTaskDto } from './dto/update-task.dto';


@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(CustomTaskRepository)
        private readonly customTaskRepository: CustomTaskRepository,
      ) {}
    async getTaskById(id: number): Promise<Task>{
        const found = await this.customTaskRepository.findOneBy({ id: id})
        if (!found){
            throw new NotFoundException('Choose a valid Id');
        }   
        return found;
    }
    async createTask(createTaskDto:CreateTaskDto): Promise<Task>{
        return this.customTaskRepository.createTask(createTaskDto);
    }
    async deleteTask(id:number): Promise<void>{
        const removedTask = await this.customTaskRepository.delete(id);
        if (removedTask.affected === 0){
            throw new NotFoundException('Choose a valid Id');
        }
    }
    async updateTask(id, updateTaskDto:UpdateTaskDto): Promise<Task>{
        const {title, description} = updateTaskDto;
        const task = await this.getTaskById(id);
        task.title = title;
        task.description = description;
        await task.save();
        return task; 
    }

    async getAllTask(): Promise<Task[]>{
     return this.customTaskRepository.getAllTask();
    }

    async updateStatus(id:number, status:TaskStatus){
        
    }






















    
    // filterTask(filterTaskDto:FilterTaskDto): Task[]{
    //     const { status, search } = filterTaskDto;
    //     let task = this.getAllTasks();

    //     if (status){
    //        task = task.filter(task => task.status === status);            
    //     }
    //     if (search){
    //         task = task.filter(task => 
    //             task.title.includes(search) ||
    //             task.description.includes(search),
    //             );
    //     }
    //     return task;
    // }
}
    
    // private tasks: Task[] = [];

    // getAllTasks(): Task[]{
    //     return this.tasks
    // }
    // getTaskById(id: string): Task{
        //     const task = this.tasks.find(task => task.id === id); 
    //     if (!task){
    //         throw new NotFoundException('Choose a valid Id');
    //     }   
    //     return task
    // }
    // filterTask(filterTaskDto:FilterTaskDto): Task[]{
    //     const { status, search } = filterTaskDto;
    //     let task = this.getAllTasks();

    //     if (status){
    //        task = task.filter(task => task.status === status);            
    //     }
    //     if (search){
    //         task = task.filter(task => 
    //             task.title.includes(search) ||
    //             task.description.includes(search),
    //             );
    //     }
    //     return task;
    // }
    // createTask(createTaskDto:CreateTaskDto): Task{
    //     const { title, description} = createTaskDto;
        
    //     const task: Task = {
    //         id: uuidv4(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN
    //     }
    //     this.tasks.push(task)
    //     return task;
    // }
    // updateTask(id: string, status: TaskStatus): Task{
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task; 
    // }
    // deleteTask(id: string): Task {
    //     const removedTask = this.getTaskById(id)
    //     this.tasks = this.tasks.filter(task => task.id !== id)
    //     return removedTask
    // }
    // // getOneTasks(){

    // // }
    // // updateTask(){

    // // }    
    // // deleteTask(){

    // // }


 