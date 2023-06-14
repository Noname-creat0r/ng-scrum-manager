import { Injectable } from "@angular/core";
import { act, Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, exhaustMap, catchError } from "rxjs/operators";

import { ProjectService } from "../project.service";
import { LoadingProjectsActions } from "./project.actions";

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

  constructor(
    private actions$: Actions,
    private projectService: ProjectService
  ) {}
}
