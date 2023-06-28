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

export const AddingProjectActions = createActionGroup({
  source: 'Project - adding',
  events: {
    'Initialized': props<{ project: ProjectModel }>(),
    'Succeeded': props<{ project: ProjectModel }>(),
    'Failed': props<{ error: string }>(),
  }
})

export const EditingProjectActions = createActionGroup({
  source: 'Project - editing',
  events: {
    'Initialized': props<{ project: ProjectModel }>(),
    'Succeeded': props<{ project: ProjectModel }>(),
    'Failed': props<{ error: string }>(),
  }
})

export const DeletingProjectActions = createActionGroup({
  source: 'Project - delete',
  events: {
    'Initialized': props<{ id: number }>(),
    'Succeeded': props<{ id: number, message: string }>(),
    'Failed': props<{ error: string}>(),
  }
});
