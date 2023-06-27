import { Injectable } from "@angular/core";
import { act, Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, exhaustMap, catchError } from "rxjs/operators";

import { ProfileService } from "../profile.service"; 
import { LoadingProfileActions } from "./profile.actions";

@Injectable()
export class ProfileEffects {
  
  loadProfile$ = createEffect(() => 
    this.actions$.pipe(
      ofType(LoadingProfileActions.initialized),
      exhaustMap(action => this.profileService.loadProfile(action.userId)
        .pipe(
          map(res => LoadingProfileActions.succeeded({ user: res.user })),
          catchError(error => of(LoadingProfileActions.failed({ error })))
        )
      )
    ) 
  );

  constructor(
    private actions$: Actions,
    private profileService: ProfileService
  ) {}
}
