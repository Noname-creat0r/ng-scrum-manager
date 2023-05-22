import { Routes } from "@angular/router";
import { appPaths } from "src/app/app.routes";
import { HomeComponent } from "../home/home.component";

export const projectPaths = {
  base: 'projects',
  iterations: 'iterations',
  backlog: 'backlog',
  project: ':id'
}

export const PROJECT_ROUTES: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./project-list/project-list.component')
      .then(mod => mod.ProjectListComponent) 
  },
  { 
    path: projectPaths.project,
    loadComponent: () => import('./project-page/project-page.component')
      .then(mod => mod.ProjectPageComponent)
  },
  { path: '**', redirectTo: appPaths.notFound }
]
