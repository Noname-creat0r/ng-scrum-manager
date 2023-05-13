import { Routes } from "@angular/router";

import { SignUpComponent } from "./signup/signup.component";
import { LogoutComponent } from "./logout/logout.component";
import { appPaths } from "../app.routes";

export const authPaths = {
   base: 'auth',
   signup: 'sign-up',
   logout: 'logout'
}

export const authRoutes = {
   signup: `/${authPaths.base}/${authPaths.signup}`,
   logout: `/${authPaths.base}/${authPaths.logout}`, 
}

export const AUTH_ROUTES: Routes = [
   { path: authPaths.signup, component: SignUpComponent },
   { path: authPaths.logout, component: LogoutComponent },
   { path: '**', redirectTo: appPaths.notFound}
]
