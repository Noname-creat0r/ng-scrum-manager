import { createFeature, createReducer, createSelector, on } from "@ngrx/store";
import { LoadingProjectsActions, LoadingProjectActions, ProjectActions } from "./project.actions";
import { ProjectModel } from "../project.model";
import { getStorageItem, setStorageItem } from "src/app/shared/utils/storage/local-storage-facade";

interface State {
  projects: Array<ProjectModel>,
  currentProjectId: string | null,
  loading: boolean;
  error: string | null;
};

const initialState: State = {
  projects: new Array<ProjectModel>(),
  currentProjectId: getStorageItem('projectId'),
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
    })),
    on(ProjectActions.selected, (state, payload) => {
      setStorageItem('projectId', payload.projectId.toString())
      return {
        ...state,
        currentProjectId: getStorageItem('projectId')
      }
    })
  ),
});

export const selectProject = () => 
  createSelector(selectProjectState, (state) => {
    return state.projects.find(project => project.id === parseInt(state.currentProjectId !== null ? state.currentProjectId : '' ))
  })

export const selectUserProjects = (userId: number) => 
  createSelector(selectProjects, (projects) => {
    return projects.filter(project => project.authorId === userId)
  })

export const selectPrivateUserProjects = (userId: number) => 
  createSelector(selectUserProjects(userId), (projects) => {
    return projects.filter(project => project.private)
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
