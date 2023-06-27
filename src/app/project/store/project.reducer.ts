import { createFeature, createReducer, createSelector, on } from "@ngrx/store";
import { LoadingProjectsActions, ProjectActions } from "./project.actions";
import { ProjectModel } from "../project.model";
import { getStorageItem, setStorageItem } from "src/app/shared/utils/storage/local-storage-facade";

interface State {
  projects: Array<ProjectModel>,
  currentProjectId: string | undefined,
  loading: boolean;
  loadingProject: boolean;
  error: string | null;
};

const initialState: State = {
  projects: new Array<ProjectModel>(),
  currentProjectId: getStorageItem('projectId'),
  loading: false, 
  loadingProject: false,
  error: null,
}

export const projectFeature = createFeature({
  name: 'project',
  reducer: createReducer(
    initialState,
    on(ProjectActions.selected, (state, payload) => {
      setStorageItem('projectId', payload.projectId.toString())
      return {
        ...state,
        currentProjectId: getStorageItem('projectId')
      }
    }),

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
    })),

  ),
});

export const selectProject = () => 
  createSelector(selectProjectState, (state) => {
    return state.projects.find(project => project.id === parseInt(state.currentProjectId !== undefined ? state.currentProjectId : '' ))
  })

export const selectUserProjects = (userId: number) => 
  createSelector(selectProjects, (projects) => {
    return projects.filter(project => project.authorId === userId)
  })

export const selectFilteredUserProjects = (userId: number, isPrivate: boolean) => 
  createSelector(selectUserProjects(userId), (projects) => {
    return projects.filter(project => project.private === isPrivate)
  })

export const {
  name,
  reducer,
  selectProjectState,
  selectProjects,
  selectCurrentProjectId,
  selectLoading,
  selectError,
} = projectFeature;
