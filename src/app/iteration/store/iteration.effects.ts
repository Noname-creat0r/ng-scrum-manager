import { Injectable } from "@angular/core";
import { act, Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, exhaustMap, catchError } from "rxjs/operators";

import { IterationService } from "../iteration.service";
import { LoadingIterationsActions } from "./iteration.actions";

@Injectable()
export class IterationEffects {
  
  loadProjects$ = createEffect(() => 
    this.actions$.pipe(
      ofType(LoadingIterationsActions.initialized),
      exhaustMap(action => this.iterationService.loadIterations(action.projectId)
        .pipe(
          map(res => LoadingIterationsActions.succeeded({ iterations: res.iterations })),
          catchError(error => of(LoadingIterationsActions.failed({ error })))
        )
      )
    ) 
  );

  constructor(
    private actions$: Actions,
    private iterationService: IterationService
  ) {}
}
