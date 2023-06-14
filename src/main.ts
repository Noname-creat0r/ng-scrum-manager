//Core
import { provideRouter, Routes } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
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
//NgRx Effectns
import { AuthEffects } from './app/auth/store/auth.effects';
import { ProjectEffects } from './app/project/store/project.effects'; 
import { TaskEffects } from './app/task/store/task.effects';
import { IterationEffects } from './app/iteration/store/iteration.effects';
//Paths
import { appPaths } from './app/app.routes';
import { authPaths } from './app/auth/auth.routes';
import { homePaths } from './app/home/home.routes';
import { projectPaths } from './app/project/project.routes';

// const reducers: ActionReducerMap<any> = {
//   auth: authFeature.reducer,
//   project: projectFeature.reducer
// } 

const appRoutes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./app/home/home.component')
      .then(mod => mod.HomeComponent),
  },
  { 
    path: projectPaths.base,
    providers: [
      provideState(projectFeature), provideState(taskFeature), provideState(iterationFeature),
      provideEffects(ProjectEffects, TaskEffects, IterationEffects),
    ],
    loadChildren: () => import('./app/project/project.routes').then(mod => mod.PROJECT_ROUTES)
  },
  {
    path: 'auth',
    loadChildren: () => import('./app/auth/auth.routes').then(mod => mod.AUTH_ROUTES),
  },
  { path: appPaths.notFound, component: NotFoundComponent },
  { path: "**", redirectTo: appPaths.notFound }
]

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideStore(),
    provideEffects(AuthEffects),
    provideStoreDevtools({
      maxAge: 25,
      trace: true,
      traceLimit: 75,
    }),
    provideState(authFeature),
    provideRouter(appRoutes),
  ]
})
  .catch(err => console.error(err));
