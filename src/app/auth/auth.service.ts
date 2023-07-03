import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse, HttpResponseBase } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { SignUpModel, SignInModel, AuthSuccess } from "./auth.model";
import { Store } from "@ngrx/store";
import { selectIsAuthenticated } from "./store/auth.reducer";

@Injectable({ providedIn: 'root' })
export class AuthService {
  baseHeaders = new HttpHeaders({ 
    'Content-Type' : 'application/json',
    'Access-Control-Allow-Origin': process.env['NG_APP_BASE_URL'],
  });
  public isAuth!: boolean
  
  constructor(
    private http: HttpClient,
    private readonly store: Store) {
      this.store.select(selectIsAuthenticated).subscribe(isAuth => {
        this.isAuth = isAuth
      })
  }
 
  signin(userData: SignInModel): Observable<AuthSuccess> {
    return this.http.post<AuthSuccess>(
      process.env['NG_APP_BASE_URL'] + '/auth/signin',
      {...userData},
      { ...this.baseHeaders }
    );
  }

  signup(userData: SignUpModel) {
    return this.http.post(
      process.env['NG_APP_BASE_URL'] + '/auth/signup',
      {...userData},
      { ...this.baseHeaders }
    );
  }

}
