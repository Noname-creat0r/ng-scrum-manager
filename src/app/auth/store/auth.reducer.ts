import { createFeature, createReducer, on } from "@ngrx/store";
import { SignUpActions, SignInActions } from '../store/auth.actions';

interface State {
  isAuthenticated: boolean;
  loading: boolean;
  userId: string | null;
  token: string | null;
  error: string | null;
};

const initialState: State = {
  isAuthenticated: false,
  loading: false,
  userId: null,
  token: null,
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
    on(SignInActions.succeeded, (state, payload) => ({ 
      isAuthenticated: true,
      loading: false,
      userId: payload.userId,
      token: payload.token,
      error: null,
    })),
    on(SignInActions.logout, (state) => ({
      ...state,
      isAuthenticated: false,
      userId: null,
      token: null,
      error: null,
    })),
    
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
