import { Component, Input } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { NgbModal, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';

import { TaskModel } from '../../../task.model';
import { TaskActions } from 'src/app/task/store/task.actions';
import { TaskControlComponent } from 'src/app/task/task-control/task-control.component';

@Component({
  selector: 'task-item',
  standalone: true,
  imports: [CommonModule, NgbPopoverModule],
  templateUrl: 'task-item.component.html'
})
export class TaskItemComponent {
  @Input() task!: TaskModel

  constructor(
    private readonly store: Store,
    private modalService: NgbModal) {}

  onPopoverShown() {
    this.store.dispatch(TaskActions.selected({ taskId: this.task.id?.toString() }))
  }

  onPopoverHidden() {}

  onTaskEditClicked() {
   this.modalService.open(TaskControlComponent) 
  }

  onTaskDeleteClicked() {

  }
}
