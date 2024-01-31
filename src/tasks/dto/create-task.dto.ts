import { TaskStatus } from "../task-status.enum"; 
import { IsString, IsEmail, IsNotEmpty, IsEnum } from "class-validator";


export class CreateTaskDto{
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty() 
    description: string;
    // status: TaskStatus.OPEN | TaskStatus.ON_GOING | TaskStatus.DONE;
}