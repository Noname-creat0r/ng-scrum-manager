import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse, HttpResponseBase } from "@angular/common/http";
import { Observable, of, Subject } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { IterationModel } from "./iteration.model";
import { TaskModel } from "../task/task.model";
import { Store } from "@ngrx/store";
import { selectIterationTasks } from "../task/store/task.reducer";
import { selectIterationId } from "./store/iteration.reducer";

@Injectable({ providedIn: 'root' })
export class IterationService {
  baseHeaders = new HttpHeaders({ 
    'Content-Type' : 'application/json',
    'Access-Control-Allow-Origin': process.env['NG_APP_BASE_URL'],
  });

  constructor(
    private http: HttpClient,
    private readonly store: Store) { }
 

  loadIterations(projectId?: string): Observable<{ iterations: Array<IterationModel> }> {
    return this.http.get<{ iterations: Array<IterationModel> }>(
      process.env['NG_APP_BASE_URL'] + `/iteration?projectId=${projectId}`,
      { ...this.baseHeaders }
    );
  }  
  
  addIteration(iteration: IterationModel): Observable<{ iteration: IterationModel, message: string }> {
    return this.http.post<{ iteration: IterationModel, message: string }>(
      process.env['NG_APP_BASE_URL'] + `/iteration`,
      { iteration },
      { ...this.baseHeaders }
    );
  }

  editIteration(iteration: IterationModel): Observable<{ iteration: IterationModel, message: string }> {
    return this.http.put<{ iteration: IterationModel, message: string }>(
      process.env['NG_APP_BASE_URL'] + `/iteration`,
      { iteration }, 
      { ...this.baseHeaders }
    );
  }

  deleteIteration(iterationId: number): Observable<{ id: number, message: string }> {
    return this.http.delete<{ id: number, message: string }>(
      process.env['NG_APP_BASE_URL'] + `/iteration?id=` + iterationId,
      { ...this.baseHeaders }
    );
  }
}
