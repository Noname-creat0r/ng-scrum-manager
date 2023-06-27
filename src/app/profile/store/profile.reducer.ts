import { createFeature, createReducer, createSelector, on } from "@ngrx/store";
import { ProfileModel } from "../profile.model";
import { LoadingProfileActions } from "./profile.actions";
import { getStorageItem, setStorageItem } from "src/app/shared/utils/storage/local-storage-facade";

interface State {
  user: ProfileModel | null,
  loading: boolean;
  error: string | null;
};

const initialState: State = {
  user: null,
  loading: false, 
  error: null,
}

export const profileFeature = createFeature({
  name: 'profile',
  reducer: createReducer(
    initialState,

    on(LoadingProfileActions.initialized, (state) => ({ 
      ...state,
      loading: true,
      error: null,
    })),
    on(LoadingProfileActions.failed, (state, payload) => ({ 
      ...state,
      loading: false,
      error: payload.error
    })),
    on(LoadingProfileActions.succeeded, (state, payload) => ({ 
      ...state,
      loading: false,
      user: payload.user 
    })),

  ),
});


export const {
  name,
  reducer,
  selectProfileState,
  selectUser,
  selectLoading,
  selectError,
} = profileFeature
