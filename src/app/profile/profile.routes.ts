import { Routes } from "@angular/router";
import { appPaths } from "src/app/app.routes";

export const profilePaths = {
  base: 'profile',
  public: 'public'
}

export const PROFILE_ROUTES: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./profile.component')
      .then(mod => mod.ProfileComponent) 
  },
  { path: '**', redirectTo: appPaths.notFound }
]
