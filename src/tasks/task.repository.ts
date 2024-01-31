import {  DataSource, EntityRepository, QueryBuilder, Repository } from "typeorm";
import { Task } from "./task.entity";
import { Injectable } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { FilterTaskDto } from "./dto/filter-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";


// @EntityRepository(Task)
// @CustomRepository(Task)
@Injectable()
export class CustomTaskRepository extends Repository<Task> {
  
   
  constructor(private readonly dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async getAllTask(): Promise<Task[]>{
    // const {status, search} = filterTaskDto;
    const query = this.createQueryBuilder('task');    
    const tasks = await query.getMany();
    return tasks;
    // if (status){
    //   query.andWhere('task.status = :status', { status })
    // }
    
    // if (search){
    //   query.andWhere(('task.title LIKE :search OR task.description LIKE :search'), { search : `%${search}%`})
    // }
  }
  
  

  async createTask(createTaskDto:CreateTaskDto): Promise<Task>{
    const { title, description} = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    await task.save();
    return task; 
  }
}



