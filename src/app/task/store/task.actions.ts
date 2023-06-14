import { createActionGroup, createFeature, emptyProps, props } from "@ngrx/store";
import { TaskDisplayContainer, TaskModel, TaskSuccess } from "../task.model";

export const TaskActions = createActionGroup({
  source: 'Tasks',
  events: {
    'Selected': props<{ taskId: string }>(),
    'Deselected': emptyProps(),
    'Moved in container': props<{ bContainerPos: number }>(),
    'Moved to iteration': props<{ iterationId: number, taskId?: number }>(),
  }
})

export const TaskSync = createActionGroup({
  source: 'Tasks - sync',
  events: {
    'Initialized': props<{ positionsContanier: 
      Array<{ id: number, bContainerPos: number, status: string}> }>(),
    'Succeeded': props<{ message: string }>(),
    'Failed': props<{ error: string }>(),
  }
});

export const LoadingTasksActions = createActionGroup({
  source: 'Tasks - loading',
  events: {
    'Initialized': props<{ projectId?: string }>(),
    'Succeeded' : props<TaskSuccess>(),
    'Failed' : props<{ error: string }>(), 
  }
});

export const AddingTaskActions = createActionGroup({
  source: 'Task - adding',
  events: {
    'Initialized': props<{ task: TaskModel }>(),
    'Succeeded': props<{ task: TaskModel }>(),
    'Failed': props<{ error: string }>(),
  }
});

export const EditingTaskActions = createActionGroup({
  source: 'Task - editing',
  events: {
    'Initialized': props<{ task: TaskModel }>(),
    'Succeeded': props<{ task: TaskModel }>(),
    'Failed': props<{ error: string }>(),
  }
});

export const DeletingTaskActions = createActionGroup({
  source: 'Task - deleting',
  events: {
    'Initialized': props<{ taskId: number }>(),
    'Succeeded': props<{ taskId: number }>(),
    'Failed': props<{ error: string }>(),
  }
});
