import { createActionGroup, emptyProps, props } from "@ngrx/store";

 export const SignInActions = createActionGroup({
  source: 'Sign In',
  events: {
    'Initialized' :props<{ email: string, password: string }>(),
    'Succeeded' : props<{ token: string, userId: string }>(),
    'Failed' : props<{ error: string }>(), 
    'Reauth' : emptyProps(),
    'Logout' : emptyProps()   
  }
});

export const SignUpActions = createActionGroup({
  source: 'Sign Up',
  events: {
    'Initialized' : props<{ email: string, password: string, username: string}>(),
    'Failed' : props<{ error: string }>(),
    'Succeeded' : emptyProps() , 
  }
});
 
