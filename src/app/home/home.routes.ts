import { Routes } from "@angular/router";

import { HomeComponent } from "../home/home.component";

import { appPaths } from "../app.routes";

export const homePaths = {
  base: 'home',
  projects:'projects',
}

export const homeRoutes = {
   projects: `/${homePaths.base}/${homePaths.projects}`,
}

export const HOME_ROUTES: Routes = [
   { path: homePaths.base, component: HomeComponent },
   { path: '**', redirectTo: appPaths.notFound}
]
