import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store'; 
import { Observable, Subject } from 'rxjs';

import { TaskModel, TaskDisplayContainer } from '../task.model';

import { TaskListComponent } from './task-list/task-list.component';
import { TaskSync } from '../store/task.actions';
import { selectIterationId } from 'src/app/iteration/store/iteration.reducer';

@Component({
  selector: 'task-board',
  standalone: true,
  imports: [CommonModule, DragDropModule, NgbPopoverModule, TaskListComponent],
  templateUrl: 'task-board.component.html'
})
export class TaskBoardComponent implements OnInit, OnDestroy {
  @Input() isLoading: boolean | null = false
  @Input() tasksObs!: Observable<Array<TaskModel>>
  @Input() mode: 'backlog' | 'iteration' = 'backlog'
  @Input() iterationId!: number 

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

  constructor(private readonly store: Store) {}

  syncContainers() {
    const positionsContainer = []
    for (const container of this.boardContainers) {
      const conStatus = container.title 
      const conPosData = container.data.map(model => ({
        id: model.content.id,
        bContainerPos: container.data.findIndex(sModel => sModel.content.id === model.content.id),
        status: conStatus
      })) 
      positionsContainer.push(...conPosData)
    }
      
    this.store.dispatch(TaskSync.initialized({ positionsContanier: positionsContainer }))

  }

  ngOnInit() {
    this.tasksObs.subscribe(tasks => {
      if (tasks.length) {
        const titles = this.boardContainers.map(container => container.title)

        for (const title of titles) {       
          let containerData: Array<{ disabled: boolean, content: TaskModel }> = 
            tasks
              .filter(task => task.status.status === title)
              .sort((tA: TaskModel, tB: TaskModel) => { 
                if (tA.bContainerPos > tB.bContainerPos) return 1;
                else if (tA.bContainerPos < tB.bContainerPos) return -1;
                else return 0;
              })
              .map(task => ({
                disabled: false,
                content: task
              }) )
        
          // if (this.mode === 'iteration') {
          //   containerData = containerData.filter(obj => obj.content.iterationId === this.iterationId)
          // }

          const cid = this.boardContainers.findIndex(container => container.title === title) 
          this.boardContainers[cid].data = containerData;  
        }
      }

    })
  }

  ngOnDestroy() {
    this.syncContainers()
  }
}
