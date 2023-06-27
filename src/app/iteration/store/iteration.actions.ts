import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { IterationModel } from "../iteration.model";

export const LoadingIterationsActions = createActionGroup({
  source: 'Iterations - loading',
  events: {
    'Initialized': props<{ projectId?: string }>(),
    'Succeeded' : props<{ iterations: Array<IterationModel> }>(),
    'Failed' : props<{ error: string }>(), 
  }
});

export const IterationActions = createActionGroup({
  source: 'Iteration',
  events: {
    'Selected': props<{ iterationId: number }>(),
    'Loaded': emptyProps(),
  }
}); 
