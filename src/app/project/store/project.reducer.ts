import { createFeature, createReducer, on } from "@ngrx/store";
import { LoadingProjectsActions, LoadingProjectActions } from "./project.actions";
import { ProjectModel } from "../project.model";

interface State {
  projects: Array<ProjectModel>, 
  loading: boolean;
  error: string | null;
};

const initialState: State = {
  projects: new Array<ProjectModel>(),
  loading: false, 
  error: null,
}

export const projectFeature = createFeature({
  name: 'project',
  reducer: createReducer(
    initialState,
    on(LoadingProjectsActions.initialized, (state) => ({ 
      ...state,
      loading: true,
      error: null,
    })),
    on(LoadingProjectsActions.failed, (state, payload) => ({ 
      ...state,
      loading: false,
      error: payload.error
    })),
    on(LoadingProjectsActions.succeeded, (state, payload) => ({ 
      ...state,
      loading: false,
      projects: payload.projects 
    }))
  )
});

export const {
  name,
  reducer,
  selectProjectState,
  selectProjects,
  selectLoading,
  selectError,
} = projectFeature;
