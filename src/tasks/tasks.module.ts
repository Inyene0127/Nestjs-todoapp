import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomTaskRepository } from './task.repository';
import { Task } from './task.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomTaskRepository])
  ],
  controllers: [TasksController],
  providers: [TasksService, CustomTaskRepository]
})
export class TasksModule {}
