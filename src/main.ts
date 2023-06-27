//Core
import { provideRouter, Routes } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
//NgRx
import { ActionReducerMap, provideState, provideStore, RootStoreConfig } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
//Components
import { AppComponent } from './app/app.component';
import { NotFoundComponent } from './app/shared/components/errors/not-found/not-found.component';
//NgRx Features
import { authFeature } from './app/auth/store/auth.reducer';
import { projectFeature } from './app/project/store/project.reducer';
import { taskFeature } from './app/task/store/task.reducer';
import { iterationFeature } from './app/iteration/store/iteration.reducer';
import { profileFeature } from './app/profile/store/profile.reducer'; 
//NgRx Effectns
import { AuthEffects } from './app/auth/store/auth.effects';
import { ProjectEffects } from './app/project/store/project.effects'; 
import { TaskEffects } from './app/task/store/task.effects';
import { IterationEffects } from './app/iteration/store/iteration.effects';
import { ProfileEffects } from './app/profile/store/profile.effects';
//Paths
import { appPaths } from './app/app.routes';
import { authPaths } from './app/auth/auth.routes';
import { homePaths } from './app/home/home.routes';
import { profilePaths } from './app/profile/profile.routes';
import { projectPaths } from './app/project/project.routes';

// const reducers: ActionReducerMap<any> = {
//   auth: authFeature.reducer,
//   project: projectFeature.reducer
// } 

const appRoutes: Routes = [
  {
    path: homePaths.base,
    loadChildren: () => import('./app/home/home.routes')
      .then(mod => mod.HOME_ROUTES),
  },
  {
    path: profilePaths.base,
    providers: [ provideState(profileFeature), provideEffects(ProfileEffects) ],
    loadChildren: () => import('./app/profile/profile.routes')
      .then(mod => mod.PROFILE_ROUTES)
  },
  { 
    path: projectPaths.base,
    loadChildren: () => import('./app/project/project.routes').then(mod => mod.PROJECT_ROUTES)
  },
  {
    path: 'auth',
    loadChildren: () => import('./app/auth/auth.routes').then(mod => mod.AUTH_ROUTES),
  },
  { path: appPaths.notFound, component: NotFoundComponent, data: {animation: 'isRight'} },
  { path: "**", redirectTo: appPaths.notFound }
]

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideAnimations(),
    provideStore(),
    provideEffects(AuthEffects, ProjectEffects, TaskEffects, IterationEffects),
    provideStoreDevtools({
      maxAge: 25,
      trace: true,
      traceLimit: 75,
    }),

    provideState(authFeature), 
    provideState(projectFeature), 
    provideState(taskFeature),
    provideState(iterationFeature),

    provideRouter(appRoutes),
  ]
})
  .catch(err => console.error(err));
