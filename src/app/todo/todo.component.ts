import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: any[] = [];
  title: string = '';
  description: string = '';

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks() {
    this.todoService.getAllTasks().subscribe({
      next: (tasks: any[]) => {
        this.todos = tasks;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  addTodo() {
    if (this.title.trim() !== '') {
      this.todoService.createTask(this.title, this.description).subscribe({
        next: (task: any) => {
          this.todos.push(task);
          this.title = ''; 
          this.description = '';
        },
        error: (error: any) => {
          console.log(error);
        }
      });
    }
  }

  deleteTodo(id: number) {
    this.todoService.deleteTask(id).subscribe({
      next: () => {
        this.todos = this.todos.filter(todo => todo.id !== id);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
  
  toggleEditMode(todo: any) {
    todo.editMode = !todo.editMode;
    if (!todo.editMode) {
      
      this.todoService.updateTask({ title: todo.editedTitle, description: todo.editedDescription }, todo.id).subscribe({
        next: (updatedTask: any) => {
          
          const index = this.todos.findIndex(task => task.id === updatedTask.id);
          if (index !== -1) {
            this.todos[index] = { ...updatedTask, editMode: false, editedTitle: updatedTask.title, editedDescription: updatedTask.description };
          }
        },
        error: (error: any) => {
          console.log(error);
        }
      });
    }
  }      
}
