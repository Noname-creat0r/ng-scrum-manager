import { createFeature, createReducer, createSelector, on, select } from "@ngrx/store";
import { getStorageItem, setStorageItem } from "src/app/shared/utils/storage/local-storage-facade";

import { IterationModel } from "../iteration.model";
import { IterationActions, LoadingIterationsActions } from "./iteration.actions";

interface State {
  iterations: Array<IterationModel>,
  iterationId: number | undefined,
  loading: boolean;
  error: string | null;
};

const initialState: State = {
  iterations: new Array<IterationModel>(),
  iterationId: parseInt(getStorageItem('iterationId')!),
  loading: false, 
  error: null,
}

export const iterationFeature = createFeature({
  name: 'iteration',
  reducer: createReducer(
    initialState,
    on(IterationActions.selected, (state, payload) => {
      setStorageItem('iterationId', payload.iterationId)
      
      return {
        ...state,
        loading: true,
        iterationId: parseInt(getStorageItem('iterationId')!)
      }
    }),
    on(IterationActions.loaded, (state) => ({
      ...state, loading: false
    })),

    on(LoadingIterationsActions.initialized, (state) => ({ 
      ...state,
      loading: true,
      error: null,
    })),
    on(LoadingIterationsActions.failed, (state, payload) => ({ 
      ...state,
      loading: false,
      error: payload.error
    })),
    on(LoadingIterationsActions.succeeded, (state, payload) => ({ 
      ...state,
      loading: false,
      iterations: payload.iterations 
    })),

  ),
});

export const selectIteration = () => 
  createSelector(selectIterationState, (state) => {
    return state
      .iterations
      .find(iteration => iteration.id === state.iterationId!)
  })

export const {
  name,
  reducer,
  selectIterationState,
  selectIterations,
  selectIterationId,
  selectLoading,
  selectError,
} = iterationFeature;
