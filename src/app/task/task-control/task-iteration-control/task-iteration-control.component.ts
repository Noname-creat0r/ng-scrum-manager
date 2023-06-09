import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { selectIterations } from 'src/app/iteration/store/iteration.reducer';
import { IterationModel } from 'src/app/iteration/iteration.model';
import { TaskModel } from '../../task.model';
import { selectTask } from '../../store/task.reducer';
import { EditingTaskActions, TaskActions } from '../../store/task.actions';

@Component({
  selector: 'app-task-iteration-control',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'task-iteration-control.component.html' 
})
export class TaskIterationControlComponent implements OnInit {

  iterations: Array<IterationModel> = []
  task!: TaskModel

  constructor(
    private readonly store: Store,
    private activeModal: NgbActiveModal ) {}

  ngOnInit() {
    this.store.select(selectIterations).subscribe(iterations => {
      this.iterations = iterations
    })
    this.store.select(selectTask()).subscribe(task => {
      this.task = task!
    })
  }

  onIterationChosen(id: number | null) {
    const cpTask: TaskModel = { ...this.task }
    cpTask.iterationId = id
    this.store.dispatch(EditingTaskActions.initialized({ task: cpTask }))
    this.activeModal.close()
  }
}
