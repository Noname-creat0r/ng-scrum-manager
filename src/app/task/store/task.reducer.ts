import { createFeature, createReducer, createSelector, on } from "@ngrx/store";
import { LoadingTasksActions } from "./task.actions";
import { TaskModel } from "../task.model";

interface State {
  tasks: Array<TaskModel>;
  loading: boolean;
  error: string | null;
};

const initialState: State = {
  tasks: new Array<TaskModel>(),
  loading: false, 
  error: null,
}

export const taskFeature = createFeature({
  name: 'task',
  reducer: createReducer(
    initialState,
    on(LoadingTasksActions.initialized, (state) => ({ 
      ...state,
      loading: true,
      error: null,
    })),
    on(LoadingTasksActions.failed, (state, payload) => ({ 
      ...state,
      loading: false,
      error: payload.error
    })),
    on(LoadingTasksActions.succeeded, (state, payload) => ({ 
      ...state,
      loading: false,
      tasks: payload.tasks 
    }))
  ),
});

export const selectIterationTasks = (iterationId: number) => 
  createSelector(selectTasks, (tasks) => {
    return tasks.filter(task => task.iterationId === iterationId)
  })

export const {
  name,
  reducer,
  selectTaskState,
  selectTasks,
  selectLoading,
  selectError,
} = taskFeature;
