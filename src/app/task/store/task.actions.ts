import { createActionGroup, createFeature, emptyProps, props } from "@ngrx/store";
import { TaskDisplayContainer, TaskModel, TaskPositionItem, TaskSuccess } from "../task.model";

export const TaskActions = createActionGroup({
  source: 'Tasks',
  events: {
    'Selected': props<{ taskId: string }>(),
    'Deselected': emptyProps(),
    'Moved': props<{ taskId: number, mode: string, newPos: number, status?: string }>(),
    'Iteration formed': props<{ iterationId: number}>(),
  }
})

export const TaskSync = createActionGroup({
  source: 'Tasks - sync',
  events: {
    'Initialized': props<{ positionsContanier: Array<TaskPositionItem> }>(),
    'Succeeded': props<{ positionsContanier: Array<TaskPositionItem>, message: string }>(),
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
