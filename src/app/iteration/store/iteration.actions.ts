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
    'Deselected': emptyProps(),
    'Loaded': emptyProps(),
  }
});

export const AddingIterationActions = createActionGroup({
  source: 'Iteration - adding',
  events: {
    'Initialized': props<{ iteration: IterationModel }>(),
    'Succeeded' : props<{ iteration: IterationModel, message: string }>(),
    'Failed' : props<{ error: string }>(),
  }
});

export const EditingIterationActions = createActionGroup({
  source: 'Iteration - editing',
  events: {
    'Initialized': props<{ iteration: IterationModel }>(),
    'Succeeded' : props<{ iteration: IterationModel, message: string }>(),
    'Failed' : props<{ error: string }>(),
  }
});

export const DeletingIterationActions = createActionGroup({
  source: 'Iteration - deleting',
  events: {
    'Initialized': props<{ id: number }>(),
    'Succeeded' : props<{ id: number, message: string }>(),
    'Failed' : props<{ error: string }>(),
  }
});
