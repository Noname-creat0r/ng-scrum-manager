import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse, HttpResponseBase } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { IterationModel } from "./iteration.model";

@Injectable({ providedIn: 'root' })
export class IterationService {
  baseHeaders = new HttpHeaders({ 
    'Content-Type' : 'application/json',
    'Access-Control-Allow-Origin': process.env['NG_APP_BASE_URL'],
  });
  
  constructor(private http: HttpClient) { }
 
  loadIterations(projectId?: string): Observable<{ iterations: Array<IterationModel> }> {
    return this.http.get<{ iterations: Array<IterationModel> }>(
      process.env['NG_APP_BASE_URL'] + `/iteration?projectId=${projectId}`,
      { ...this.baseHeaders }
    );
  }  

}
