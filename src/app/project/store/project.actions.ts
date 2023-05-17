import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ProjectModel, ProjectSuccess } from "../project.model";

export const LoadingProjectsActions = createActionGroup({
  source: 'Projects - loading',
  events: {
    'Initialized': props<{ userId?: string }>(),
    'Succeeded' : props<ProjectSuccess>(),
    'Failed' : props<{ error: string }>(), 
  }
});

export const LoadingProjectActions = createActionGroup({
  source: 'Project - loading',
  events: {
    'Initialized': emptyProps(),
    'Succeeded': props<{ project: ProjectModel}>(),
    'Failed': props<{ error : string}>()
  }
});
