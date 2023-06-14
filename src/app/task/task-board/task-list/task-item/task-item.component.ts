import { Component, Input } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { NgbModal, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';

import { TaskModel } from '../../../task.model';
import { DeletingTaskActions, TaskActions } from 'src/app/task/store/task.actions';
import { TaskControlComponent } from 'src/app/task/task-control/task-control.component';
import { TaskPreviewComponent } from 'src/app/task/task-preview/task-preview.component';
import { TaskIterationControlComponent } from 'src/app/task/task-control/task-iteration-control/task-iteration-control.component';

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

  onTaskPreviewClicked() {
    this.modalService.open(TaskPreviewComponent, { centered: true, size: 'md' })
  }

  onTaskEditClicked() {
   this.modalService.open(TaskControlComponent) 
  }

  onTaskDeleteClicked() {
    this.store.dispatch(DeletingTaskActions.initialized({ taskId: this.task.id } ))
  }

  onTaskMoveToIteration() {
    this.modalService.open(TaskIterationControlComponent)
  }
}
