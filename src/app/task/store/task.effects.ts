import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, exhaustMap, catchError } from "rxjs/operators";

import { TaskService } from "../task.service";
import { LoadingTasksActions } from "../store/task.actions";

@Injectable()
export class TaskEffects {
  
  loadTasks$ = createEffect(() => 
    this.actions$.pipe(
      ofType(LoadingTasksActions.initialized),
      exhaustMap(action => this.taskService.loadTasks(action.projectId)
        .pipe(
          map(res => LoadingTasksActions.succeeded({ tasks: res.tasks })),
          catchError(error => of(LoadingTasksActions.failed({ error })))
        )
      )
    ) 
  );
 
  constructor(
    private actions$: Actions,
    private taskService: TaskService
  ) {}
}
