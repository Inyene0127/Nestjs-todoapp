import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { TaskStatus } from "../task-status.enum";

export class FilterTaskDto {
    @IsOptional()
    @IsIn([
        TaskStatus.OPEN, TaskStatus.ON_GOING, TaskStatus.DONE
    ])
    status: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}