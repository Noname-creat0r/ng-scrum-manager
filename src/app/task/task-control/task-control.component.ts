import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';

import { AddingTaskActions, EditingTaskActions } from '../store/task.actions';
import { TaskModel } from '../task.model';
import { selectCurrentProjectId } from 'src/app/project/store/project.reducer';
import { selectTaskId } from '../store/task.reducer';

@Component({
  selector: 'app-task-control',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: 'task-control.component.html' 
})
export class TaskControlComponent {
  taskForm!: FormGroup;
 
  // load task here and set the default data
  public taskId: string | undefined = undefined
  public projectId: string | undefined = undefined  

  constructor(
    public activeModal: NgbActiveModal,
    private readonly store: Store) {}

  ngOnInit() {
    this.taskForm = new FormGroup({ 
       'title': new FormControl(null, [Validators.required]),
       'description': new FormControl(null, [
          Validators.required, 
          Validators.minLength(1),
          Validators.maxLength(512)
       ]),
      'status': new FormControl(null, [Validators.required ]),
      'storyPoints': new FormControl(null, [Validators.required ])
    });

    this.store.select(selectCurrentProjectId).subscribe(id => {
      this.projectId = id
    })

    this.store.select(selectTaskId).subscribe(id => {
      this.taskId = id
    })

  }

  onSubmit() {
    const task: TaskModel = {
      title: this.taskForm.get('title')?.value,
      description: this.taskForm.get('description')?.value,
      storyPoints: this.taskForm.get('storyPoints')?.value,
      projectId: this.projectId ? +this.projectId : undefined,
      status: this.taskForm.get('status')?.value
    }
    
    if (!this.taskId) {
      this.store.dispatch(AddingTaskActions.initialized({ task: task }))
    } else {
      this.store.dispatch(EditingTaskActions.initialized({ task: task }))
    }
  }

}
