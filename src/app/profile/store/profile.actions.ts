import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ProfileModel } from "../profile.model";

export const LoadingProfileActions = createActionGroup({
  source: 'Profile - loading',
  events: {
    'Initialized': props<{ userId: number }>(),
    'Succeeded' : props<{ user: ProfileModel }>(),
    'Failed' : props<{ error: string }>(), 
  }
});

