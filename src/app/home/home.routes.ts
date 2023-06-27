import { Routes } from "@angular/router";

import { HomeComponent } from "../home/home.component";

import { appPaths } from "../app.routes";

export const homePaths = {
  base: 'home',
}

export const homeRoutes = { }

export const HOME_ROUTES: Routes = [
   { path: '', component: HomeComponent, data: { animation: 'isRight' }  },
   { path: '**', redirectTo: appPaths.notFound}
]
