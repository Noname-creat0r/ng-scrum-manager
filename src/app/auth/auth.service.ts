import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { of } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class AuthService {
  baseHeaders = new HttpHeaders({ 
    'Content-Type' : 'application/json',
    'Access-Control-Allow-Origin': process.env['NG_APP_BASE_URL'],
  });
  
  constructor(private http: HttpClient) { }
 
  signin() {}

  signup(userData: any) {
    const headers = new HttpHeaders({'Content-Type' : 'application/json'});
    const options = {headers};
    return this.http.post(process.env['NG_APP_BASE_URL'] + '/auth/signup', {...userData}, options).subscribe(next => next.toString())
       
  }

}
