import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { AuthSuccess, SignInModel, SignUpModel } from "../auth.model";

 export const SignInActions = createActionGroup({
  source: 'Sign In',
  events: {
    'Initialized' :props<SignInModel>(),
    'Succeeded' : props<AuthSuccess>(),
    'Failed' : props<{ error: string }>(), 
    'Reauth' : emptyProps(),
    'Logout' : emptyProps()   
  }
});

export const SignUpActions = createActionGroup({
  source: 'Sign Up',
  events: {
    'Initialized' : props<SignUpModel>(),
    'Failed' : props<{ error: string }>(),
    'Succeeded' : emptyProps() , 
  }
});
 
