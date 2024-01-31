import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  baseUrl = "http://localhost:3000/tasks"

  constructor(private http: HttpClient) {}

    createTask (title: any, description: any) {
      const params = {title, description}
      return this.http.post(`${this.baseUrl}`, params)
   }
    deleteTask ( id: any) {
      return this.http.delete(`${this.baseUrl}/${id}`)
   }
    updateTask (params: any, id:any) {
      return this.http.put(`${this.baseUrl}/${id}`, params)
   }
   
    getTaskById ( id:any) {
      return this.http.get(`${this.baseUrl}/${id}`)
   }

   getAllTasks(){
     return this.http.get<any[]>(`${this.baseUrl}`);
   }
}
