import { Routes, CanActivate } from "@angular/router";
import { appPaths } from "src/app/app.routes";

import { AuthGuard } from "../auth/auth.guard";

export const profilePaths = {
  base: 'profile',
  public: 'public'
}

export const PROFILE_ROUTES: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./profile.component')
      .then(mod => mod.ProfileComponent),
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: appPaths.notFound }
]
