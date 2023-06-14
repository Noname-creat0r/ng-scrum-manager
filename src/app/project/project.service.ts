import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse, HttpResponseBase } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { ProjectSuccess } from "./project.model";

@Injectable({ providedIn: 'root' })
export class ProjectService {
  baseHeaders = new HttpHeaders({ 
    'Content-Type' : 'application/json',
    'Access-Control-Allow-Origin': process.env['NG_APP_BASE_URL'],
  });
  
  constructor(private http: HttpClient) { }
 
  loadProjects(userId?: string, projectId?: string): Observable<ProjectSuccess> {
    const projectIdUrl = projectId ? `/${projectId}` : ''
    return this.http.get<ProjectSuccess>(
      process.env['NG_APP_BASE_URL'] + '/project' + projectIdUrl,
      { ...this.baseHeaders }
    );
  }  

}
