import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable, Subscription, window } from 'rxjs';

import { AddingTaskActions, EditingTaskActions } from '../store/task.actions';
import { TaskModel } from '../task.model';
import { IterationModel } from 'src/app/iteration/iteration.model';

import { selectCurrentProjectId } from 'src/app/project/store/project.reducer';
import { selectTask, selectTaskId } from '../store/task.reducer';
import { selectIterations } from 'src/app/iteration/store/iteration.reducer';

@Component({
  selector: 'task-control',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: 'task-control.component.html' 
})
export class TaskControlComponent implements OnInit, OnDestroy {
  taskForm!: FormGroup;
 
  private taskIdSub!: Subscription
  private taskSub!: Subscription
  private projectIdSub!: Subscription
  private iterationsSub!: Subscription

  //editTask!: TaskModel
  public mode: "Add" | "Edit" = "Add"
  public taskId: string | undefined = undefined
  public projectId: string | undefined = undefined  
  public iterations!: Array<IterationModel> 

  constructor(
    public activeModal: NgbActiveModal,
    private readonly store: Store) {}

  createTaskForm(task?: TaskModel) {
    return new FormGroup({ 
      'title': new FormControl(task?.title || null, [Validators.required]),
      'description': new FormControl(task?.description || null, [
        Validators.required, 
        Validators.minLength(1),
        Validators.maxLength(512)
      ]),
      'status': new FormControl(task?.status.status || null, [Validators.required ]),
      'iteration': new FormControl(task?.iterationId || null, [Validators.required]),
      'storyPoints': new FormControl(task?.storyPoints || null, [Validators.required ])
    }); 
  }

  ngOnInit() {
    this.projectIdSub = this.store.select(selectCurrentProjectId).subscribe(id => {
      this.projectId = id
    })

    this.taskIdSub = this.store.select(selectTaskId).subscribe(id => {
      this.taskId = id
    })

    this.iterationsSub = this.store.select(selectIterations).subscribe(iterations => {
      this.iterations = iterations
    })

    this.taskSub = this.store.select(selectTask()).subscribe(task => {
      if (task) {
        this.mode = "Edit"
        //this.editTask = task
        this.taskForm = this.createTaskForm(task) 
      } else {
        this.mode = "Add"
        this.taskForm = this.createTaskForm()
      }
    })
  }

  ngOnDestroy() {
    this.projectIdSub.unsubscribe()
    this.taskIdSub.unsubscribe()
    this.taskSub.unsubscribe()
    this.iterationsSub.unsubscribe()
  }


  onSubmit() {
    const iterationId = this.taskForm.get('iteration')?.value 
    const task: TaskModel = {
      id: this.taskId ? +this.taskId : 0,
      title: this.taskForm.get('title')?.value,
      description: this.taskForm.get('description')?.value,
      storyPoints: this.taskForm.get('storyPoints')?.value,
      iterationId:  iterationId === '-1' ? null : iterationId ,
      projectId: this.projectId ? +this.projectId : undefined,
      bContainerPos: 0,
      iContainerPos: 0,
      status: this.taskForm.get('status')?.value
    }
    
    if (!this.taskId) {
      this.store.dispatch(AddingTaskActions.initialized({ task: task }))
    } else {
      this.store.dispatch(EditingTaskActions.initialized({ task: task}))
    }

    this.activeModal.close()
  }

}
