import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragExit } from '@angular/cdk/drag-drop';
import { Subject, Subscription } from 'rxjs';

import { LoadingTasksActions, TaskActions } from '../../store/task.actions';
import { selectCurrentProjectId } from 'src/app/project/store/project.reducer';

import { TaskDisplayContainer, TaskModel } from '../../task.model';
import { TaskItemComponent } from './task-item/task-item.component';

@Component({
  selector: 'task-list',
  standalone: true,
  imports: [CommonModule, DragDropModule, TaskItemComponent, NgFor, NgIf ],
  templateUrl: 'task-list.component.html'
})
export class TaskListComponent implements OnInit{
  @Input() container!: TaskDisplayContainer
  @Input() isLoading: boolean | null = false
  
  @Output() dropEmmiter = new EventEmitter<void>()

  constructor(private readonly store: Store) {}

  ngOnInit() { } 
  
  ngOnDestroy() { }

  drop(event: CdkDragDrop<{ content: { content: TaskModel; disabled: boolean; }[]; status: string; }, any, any>) { 

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data.content,
        event.previousIndex,
        event.currentIndex
      )
    } else {
      transferArrayItem(
        event.previousContainer.data.content,
        event.container.data.content,
        event.previousIndex,
        event.currentIndex
      )
    }
    this.dropEmmiter.emit()
  }

  exit(event : CdkDragExit) {
  }

}
