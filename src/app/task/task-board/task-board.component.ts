import { Component, Input } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';

import { TaskModel, TaskDisplayContainer } from '../task.model';

import { TaskListComponent } from './task-list/task-list.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'task-board',
  standalone: true,
  imports: [CommonModule, DragDropModule, NgbPopoverModule, NgFor, TaskListComponent],
  templateUrl: 'task-board.component.html'
})
export class TaskBoardComponent {
  @Input() isLoading: boolean | null = false
  @Input() tasksObs!: Observable<Array<TaskModel>>

  boardContainers: Array<TaskDisplayContainer> = [
    {
      title: "Todo",
      data: []
    },
    {
      title: "Doing",
      data: []
    },
    {
      title: "Done",
      data: []
    }
  ]

  ngOnInit() {
    this.tasksObs.subscribe(tasks => {
      if (tasks.length) {
        const titles = this.boardContainers.map(container => container.title)

        for (const title of titles) {       
          const containerData: Array<{ disabled: boolean, content: TaskModel }> = 
            tasks
              .filter(task => task.status.status === title)
              .map(task => ({
                disabled: false,
                content: task
              }) )
        
          const cid = this.boardContainers.findIndex(container => container.title === title) 
          this.boardContainers[cid].data = containerData;  
        }
      }

    })
  }

  ngOnDestroy() {}
}
