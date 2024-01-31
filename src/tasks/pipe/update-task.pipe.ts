import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../task-status.enum"; 

export class UpdateTaskStatusValidation implements PipeTransform{
    readonly allowedStatus = [
        TaskStatus.OPEN,
        TaskStatus.ON_GOING,
        TaskStatus.DONE
    ]


    transform(value: any) {
        value = value.toUpperCase();

        if (!this.isStatusValid(value)) {
           throw new BadRequestException('Enter a valid status');
        }
        return value; 
    }

    private isStatusValid(status: any){
        const inx = this.allowedStatus.indexOf(status);
        return inx !== -1;
    }
}