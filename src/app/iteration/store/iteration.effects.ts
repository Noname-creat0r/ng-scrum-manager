import { Injectable } from "@angular/core";
import { act, Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, exhaustMap, catchError } from "rxjs/operators";

import { IterationService } from "../iteration.service";
import { AddingIterationActions, DeletingIterationActions, EditingIterationActions, LoadingIterationsActions } from "./iteration.actions";

@Injectable()
export class IterationEffects {
  
  loadIterations$ = createEffect(() => 
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
  
  addItertaion$ = createEffect(() => 
    this.actions$.pipe(
      ofType(AddingIterationActions.initialized),
      exhaustMap(action => this.iterationService.addIteration(action.iteration)
        .pipe(
          map(res => AddingIterationActions.succeeded({ iteration: res.iteration, message: res.message })),
          catchError(error => of(AddingIterationActions.failed({ error })))
        )
      )
    ) 
  );

  editIteration$ = createEffect(() => 
    this.actions$.pipe(
      ofType(EditingIterationActions.initialized),
      exhaustMap(action => this.iterationService.editIteration(action.iteration)
        .pipe(
          map(res => EditingIterationActions.succeeded({ iteration: res.iteration, message: res.message })),
          catchError(error => of(EditingIterationActions.failed({ error })))
        )
      )
    ) 
  );

  deleteIteration$ = createEffect(() => 
    this.actions$.pipe(
      ofType(DeletingIterationActions.initialized),
      exhaustMap(action => this.iterationService.deleteIteration(action.id)
        .pipe(
          map(res => DeletingIterationActions.succeeded({ id: res.id, message: res.message   })),
          catchError(error => of(DeletingIterationActions.failed({ error })))
        )
      )
    ) 
  );

  constructor(
    private actions$: Actions,
    private iterationService: IterationService
  ) {}
}
