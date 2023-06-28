import { Injectable } from "@angular/core";
import { act, Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, exhaustMap, catchError } from "rxjs/operators";

import { ProjectService } from "../project.service";
import { AddingProjectActions, DeletingProjectActions, LoadingProjectsActions } from "./project.actions";

@Injectable()
export class ProjectEffects {
  
  loadProjects$ = createEffect(() => 
    this.actions$.pipe(
      ofType(LoadingProjectsActions.initialized),
      exhaustMap(action => this.projectService.loadProjects(action.userId, action.projectId)
        .pipe(
          map(res => LoadingProjectsActions.succeeded({ projects: res.projects })),
          catchError(error => of(LoadingProjectsActions.failed({ error })))
        )
      )
    ) 
  );

  addProject$ = createEffect(() => 
    this.actions$.pipe(
      ofType(AddingProjectActions.initialized),
      exhaustMap(action => this.projectService.addProject(action.project)
        .pipe(
          map(res => AddingProjectActions.succeeded({ project: res.project })),
          catchError(error => of(AddingProjectActions.failed({ error})))
        )
      )
    )
  );

  deleteProject$ = createEffect(() => 
    this.actions$.pipe(
      ofType(DeletingProjectActions.initialized),
      exhaustMap(action => this.projectService.deleteProject(action.id)
        .pipe(
          map(res => DeletingProjectActions.succeeded({ id: res.id, message: res.message })),
          catchError(error => of(DeletingProjectActions.failed({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private projectService: ProjectService
  ) {}
}
