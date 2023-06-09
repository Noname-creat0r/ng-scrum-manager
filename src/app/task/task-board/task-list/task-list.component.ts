import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';

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
export class TaskListComponent implements OnInit, OnDestroy {
  @Input() container!: TaskDisplayContainer
  @Input() isLoading: boolean | null = false

  constructor(private readonly store: Store) {}

  ngOnInit() { }

  ngOnDestroy() { }

  drop(event: CdkDragDrop<Array<{ content: TaskModel, disabled: boolean }>>) {
      
    if (event.previousContainer === event.container) {
      //this.store.dispatch(TaskActions.moved({ bContainerPos: event.currentIndex}))
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )
    }
  }
}
