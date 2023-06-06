import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { TaskModel, TaskSuccess } from "./task.model";

@Injectable({ providedIn: 'root' })
export class TaskService {
  baseHeaders = new HttpHeaders({ 
    'Content-Type' : 'application/json',
    'Access-Control-Allow-Origin': process.env['NG_APP_BASE_URL'],
  });
  
  constructor(private http: HttpClient) { }

  loadTasks(projectId: string | undefined): Observable<TaskSuccess> {
    return this.http.get<TaskSuccess>(
      process.env['NG_APP_BASE_URL'] + '/task?projectId=' + projectId,
      {...this.baseHeaders}
    )
  }

  postTask(task: TaskModel): Observable<{ task: TaskModel, message?: string }> {
    return this.http.post<{ task: TaskModel, message?: string }>(
      process.env['NG_APP_BASE_URL'] + '/task',
      { ...task },
      { ...this.baseHeaders }
    )
  }

  deleteTask(taskId: number): Observable<{ taskId: number, message?: string }> {
    return this.http.delete<{ taskId: number, message?: string }>(
      process.env['NG_APP_BASE_URL'] + '/task?taskId=' + taskId,
      { ...this.baseHeaders }, 
    )
  }

  putTask(task: TaskModel): Observable<{ task: TaskModel, message?: string }> {
    return this.http.put<{ task: TaskModel, message?: string }>(
      process.env['NG_APP_BASE_URL'] + '/task',
      { ...task },
      { ...this.baseHeaders } 
    )
  }
}
