import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { TaskModel, TaskSuccess } from "../task.model";

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
    'Initialized': emptyProps(),
  }
});
