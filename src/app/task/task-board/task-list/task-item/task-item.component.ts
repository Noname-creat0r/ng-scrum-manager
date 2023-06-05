import { Component, Input } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

import { TaskModel } from '../../../task.model';

@Component({
  selector: 'task-item',
  standalone: true,
  imports: [CommonModule, NgbPopoverModule, NgIf],
  templateUrl: 'task-item.component.html'
})
export class TaskItemComponent {
  @Input() task!: TaskModel
}
