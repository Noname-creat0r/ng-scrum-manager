import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse, HttpResponseBase } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { ProfileModel } from "./profile.model";

@Injectable({ providedIn: 'root' })
export class ProfileService {
  baseHeaders = new HttpHeaders({ 
    'Content-Type' : 'application/json',
    'Access-Control-Allow-Origin': process.env['NG_APP_BASE_URL'],
  });
    
  constructor(private http: HttpClient) { }
 
  loadProfile(userId: number): Observable<{ user: ProfileModel }> {
    return this.http.get<{ user: ProfileModel }>(
      process.env['NG_APP_BASE_URL'] + '/user/' + userId,
      { ...this.baseHeaders }
    );
  }  

}
