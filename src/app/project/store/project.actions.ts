import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ProjectModel, ProjectSuccess } from "../project.model";

export const LoadingProjectsActions = createActionGroup({
  source: 'Projects - loading',
  events: {
    'Initialized': props<{ userId?: string, projectId?: string }>(),
    'Succeeded' : props<ProjectSuccess>(),
    'Failed' : props<{ error: string }>(), 
  }
});

export const ProjectActions = createActionGroup({
  source: 'Project',
  events: {
    'Selected': props<{ projectId: number }>(),
  }
}); 
