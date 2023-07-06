import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, exhaustMap, catchError } from "rxjs/operators";

import { TaskService } from "../task.service";
import { AddingTaskActions, DeletingTaskActions, EditingTaskActions, LoadingTasksActions, TaskSync } from "../store/task.actions";

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

  syncTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskSync.initialized),
      exhaustMap(action => this.taskService.syncTasks(action.positionsContanier)
        .pipe(
          map(res => TaskSync.succeeded({ positionsContanier: action.positionsContanier, message: res.message })),
          catchError(error => of(TaskSync.failed({ error })))
        )
      )
    ) 
  );

  addTask$ = createEffect(() => 
    this.actions$.pipe(
      ofType(AddingTaskActions.initialized),
      exhaustMap(action => this.taskService.postTask(action.task)
        .pipe(
          map(res => AddingTaskActions.succeeded({ task: res.task })),
          catchError(error => of(AddingTaskActions.failed({ error })))
        )
      )
    )
  );
  
  deleteTask$ = createEffect(() => 
    this.actions$.pipe(
      ofType(DeletingTaskActions.initialized),
      exhaustMap(action => this.taskService.deleteTask(action.taskId)
        .pipe(
          map(res => DeletingTaskActions.succeeded({ taskId: res.taskId })),
          catchError(error => of(DeletingTaskActions.failed({ error })))
        )
      )
    )
  );
  
  putTask$ = createEffect(() => 
    this.actions$.pipe(
      ofType(EditingTaskActions.initialized),
      exhaustMap(action => this.taskService.putTask(action.task)
        .pipe(
          map(res => EditingTaskActions.succeeded({ task: res.task })),
          catchError(error => of(EditingTaskActions.failed({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private taskService: TaskService
  ) {}
}
