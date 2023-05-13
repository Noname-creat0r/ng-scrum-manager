import { Injectable } from "@angular/core";
import { act, Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, exhaustMap, catchError } from "rxjs/operators";

import { AuthService } from "../auth.service";
import { SignInActions, SignUpActions } from "./auth.actions";

@Injectable()
export class AuthEffects {
  
  authorize$ = createEffect(() => 
    this.actions$.pipe(
      ofType(SignInActions.initialized),
      exhaustMap(action => this.authService.signin({
        email: action.email,
        password: action.password
      })
        .pipe(
          map(res => SignInActions.succeeded({ token: res.token, userId: res.userId })),
          catchError(error => of(SignInActions.failed({ error })))
        )
      )
    ) 
  );
 
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SignUpActions.initialized),
      exhaustMap(action => this.authService.signup({
        email: action.email,
        password: action.password,
        name: action.name
      })
        .pipe(
          map(res => SignUpActions.succeeded()),
          catchError(error => of(SignUpActions.failed({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}
}
