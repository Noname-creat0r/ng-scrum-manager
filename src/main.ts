import { provideRouter } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { NotFoundComponent } from './app/shared/components/errors/not-found/not-found.component';

import { appPaths } from './app/app.routes';
import { AUTH_ROUTES, authPaths } from './app/auth/auth.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      {
        path: authPaths.base,
        loadChildren: () => import('./app/auth/auth.routes').then(mod => mod.AUTH_ROUTES)
      },
      { path: appPaths.notFound, component: NotFoundComponent },
      { path: "**", redirectTo: appPaths.notFound }
  ])]
})
  .catch(err => console.error(err));
