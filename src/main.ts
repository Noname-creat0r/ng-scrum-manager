//Core
import { provideRouter } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
//NgRx
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
//Components
import { AppComponent } from './app/app.component';
import { NotFoundComponent } from './app/shared/components/errors/not-found/not-found.component';
import { HomeComponent } from './app/home/home.component';
//Features - Reducers - Effects
import { authFeature } from './app/auth/store/auth.reducer';
import { AuthEffects } from './app/auth/store/auth.effects';
//Paths
import { appPaths } from './app/app.routes';
import { authPaths } from './app/auth/auth.routes';

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
    provideRouter([
      {
        path: appPaths.home,
        component: HomeComponent
      },
      {
        path: authPaths.base,
        loadChildren: () => import('./app/auth/auth.routes').then(mod => mod.AUTH_ROUTES)
      },
      { path: appPaths.notFound, component: NotFoundComponent },
      { path: "**", redirectTo: appPaths.notFound }
  ])]
})
  .catch(err => console.error(err));
