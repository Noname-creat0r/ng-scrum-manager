import { createFeature, createReducer, createSelector, on } from "@ngrx/store";
import { TaskActions, AddingTaskActions, DeletingTaskActions, EditingTaskActions,
  LoadingTasksActions } from "./task.actions";
import { TaskModel } from "../task.model";
import { getStorageItem, removeStorageItem, setStorageItem } from "src/app/shared/utils/storage/local-storage-facade";

interface State {
  tasks: Array<TaskModel>;
  iterationTasks: Array<TaskModel>;
  taskId: string | undefined;
  loading: boolean;
  error: string | null;
};

const initialState: State = {
  tasks: new Array<TaskModel>(),
  iterationTasks: new Array<TaskModel>(),
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
        taskId: currentTaskId 
      }
    }),
    on(TaskActions.deselected, (state) => {
      removeStorageItem('taskId')
 
      return {
        ...state,
        taskId: undefined
      }
    }),
    on(TaskActions.iterationFormed, (state, payload) => ({
      ...state,
      iterationTasks: [...state.tasks.filter(task => task.iterationId === payload.iterationId)]
    })), 

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
      ...state,
      loading: true,
    })),
    on(DeletingTaskActions.failed, (state, payload) => ({
      ...state,
      error: payload.error,
      loading: false,
    })),
    on(DeletingTaskActions.succeeded, (state, payload) => {
      const delTaskId = payload.taskId
      const updTasks = state.tasks.filter(task => task.id !== delTaskId)

      return {
        ...state,  
        error: null,
        loading: false,
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
      const updTasks = [...state.tasks]
      updTasks[updTaskId] = payload.task

      return {
        ...state,
        error: null,
        tasks: updTasks 
      }
    })

  ),
});

export const selectTask = () =>
  createSelector(selectTaskState, (state) => {
    return state.tasks.find(task => task.id === (state.taskId ? +state.taskId : '')) 
  })

export const {
  name,
  reducer,
  selectTaskState,
  selectTasks,
  selectIterationTasks,
  selectTaskId,
  selectLoading,
  selectError,
} = taskFeature;
