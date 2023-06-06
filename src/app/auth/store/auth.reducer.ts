import { createFeature, createReducer, on } from "@ngrx/store";
import { SignUpActions, SignInActions } from '../store/auth.actions';
import { setStorageItem, getStorageItem,
  removeStorageItem} from "src/app/shared/utils/storage/local-storage-facade";

interface State {
  isAuthenticated: boolean;
  loading: boolean;
  userId: string | undefined;
  token: string | undefined;
  error: string | null;
};

const initialState: State = {
  isAuthenticated: getStorageItem('token') ? true : false,
  loading: false,
  userId: getStorageItem('userId'),
  token: getStorageItem('token'),
  error: null,
}

export const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    
    on(SignInActions.initialized, (state) => ({ 
      ...state,
      loading: true,
      error: null,
    })),
    on(SignInActions.failed, (state, payload) => ({ 
      ...state,
      loading: false,
      error: payload.error
    })),
    on(SignInActions.succeeded, (state, payload) => { 
      setStorageItem('token', payload.token)
      setStorageItem('userId', payload.userId)
      return { 
        isAuthenticated: true,
        loading: false,
        userId: payload.userId,
        token: payload.token,
        error: null
      }
    }),
    on(SignInActions.logout, (state) => {
      removeStorageItem('token')
      removeStorageItem('userId')
      return {
        ...state,
        isAuthenticated: false,
        userId: undefined,
        token: undefined,
        error: null,
      }
    }),
    
    on(SignUpActions.initialized, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(SignUpActions.succeeded, (state) => ({
      ...state,
      loading: false,
      error: null,
    })),
    on(SignUpActions.failed, (state, payload) => ({
      ...state,
      loading: true,
      error: payload.error
    })),
  ),
});

export const {
  name,
  reducer,
  selectAuthState,
  selectIsAuthenticated,
  selectLoading,
  selectUserId,
  selectToken,
  selectError,
} = authFeature;
