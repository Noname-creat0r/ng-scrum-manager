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

  iterationTasks: TaskModel[] | undefined = undefined

  constructor(
    private http: HttpClient,
    private readonly store: Store) { }
 

  loadIterations(projectId?: string): Observable<{ iterations: Array<IterationModel> }> {
    return this.http.get<{ iterations: Array<IterationModel> }>(
      process.env['NG_APP_BASE_URL'] + `/iteration?projectId=${projectId}`,
      { ...this.baseHeaders }
    );
  }  

}
