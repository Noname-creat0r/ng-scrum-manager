import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { filter, Observable, Subject, takeUntil } from 'rxjs';

import { selectIterationId, selectIterations, selectLoading } from '../store/iteration.reducer';
import { selectIterationTasks, selectTasks } from 'src/app/task/store/task.reducer';

import { TaskModel } from 'src/app/task/task.model';
import { IterationModel } from '../iteration.model';

import { IterationItemComponent } from './iteration-item/iteration-item.component';
import { TaskBoardComponent } from 'src/app/task/task-board/task-board.component';
import { TaskActions } from 'src/app/task/store/task.actions';

@Component({
  selector: 'iteration-list',
  standalone: true,
  imports: [CommonModule, IterationItemComponent, TaskBoardComponent],
  templateUrl: 'iteration-list.component.html' 
})
export class IterationListComponent implements OnInit, OnDestroy{
  private componentDestroyed$ = new Subject<void>()

  iterations$ = this.store.select(selectIterations)
  iterationId$ = this.store.select(selectIterationId)
  tasks$ = this.store.select(selectIterationTasks)
  //isLoadingTasks$ = this.store.select(selectLoading)
  isLoadingIterations$ = this.store.select(selectLoading)

  constructor(private readonly store: Store){}

  ngOnInit() {
    this.iterationId$.pipe(takeUntil(this.componentDestroyed$)).subscribe(id => {
      this.store.dispatch(TaskActions.iterationFormed({ iterationId: id! }))
    })
  }

  ngOnDestroy() {
    this.componentDestroyed$.next()
    this.componentDestroyed$.complete()
  }
}
