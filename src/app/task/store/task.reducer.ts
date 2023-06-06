import { createFeature, createReducer, createSelector, on } from "@ngrx/store";
import { TaskActions, AddingTaskActions, DeletingTaskActions, EditingTaskActions,
  LoadingTasksActions } from "./task.actions";
import { TaskModel } from "../task.model";
import { getStorageItem, setStorageItem } from "src/app/shared/utils/storage/local-storage-facade";

interface State {
  tasks: Array<TaskModel>;
  taskId: string | undefined;
  loading: boolean;
  error: string | null;
};

const initialState: State = {
  tasks: new Array<TaskModel>(),
  taskId: getStorageItem('taskId'), 
  loading: false, 
  error: null,
}

export const taskFeature = createFeature({
  name: 'task',
  reducer: createReducer(
    initialState,

    on(TaskActions.selected, (state, payload) => {
      const currentTaskId = payload.taskId
      setStorageItem('taskId', currentTaskId)

      return {
        ...state,
        currentTaskId: currentTaskId 
      }
    }),

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
    })),

    on(AddingTaskActions.initialized, (state) => ({
      ...state,
      loading: true,
    })),
    on(AddingTaskActions.failed, (state, payload) => ({
      ...state,
      loading: false,
      error: payload.error
    })),
    on(AddingTaskActions.succeeded, (state, payload) => ({
      ...state,
      error: null,
      loading: false,
      tasks: [payload.task, ...state.tasks]
    })),

    on(DeletingTaskActions.initialized, (state) => ({
      ...state
    })),
    on(DeletingTaskActions.failed, (state, payload) => ({
      ...state,
      error: payload.error
    })),
    on(DeletingTaskActions.succeeded, (state, payload) => {
      const delTaskId = payload.taskId 
      const updTasks = state.tasks
      updTasks.splice(delTaskId, 1)

      return {
        ...state,  
        error: null,
        tasks: updTasks
      }
    }),

    on(EditingTaskActions.initialized, (state) => ({
      ...state,
    })),
    on(EditingTaskActions.failed, (state, payload) => ({
      ...state,
      error: payload.error
    })),
    on(EditingTaskActions.succeeded, (state, payload) => { 
      const updTaskId = state.tasks.findIndex(task => task.id === payload.task.id )
      const updTasks = state.tasks
      updTasks[updTaskId] = payload.task

      return {
        ...state,
        error: null,
        tasks: updTasks 
      }
    })

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
  selectTaskId,
  selectLoading,
  selectError,
} = taskFeature;
