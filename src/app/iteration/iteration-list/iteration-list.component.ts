import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectIterationId, selectIterations } from '../store/iteration.reducer';
import { selectIterationTasks, selectLoading } from 'src/app/task/store/task.reducer';

import { TaskModel } from 'src/app/task/task.model';
import { IterationModel } from '../iteration.model';

import { IterationItemComponent } from './iteration-item/iteration-item.component';
import { TaskBoardComponent } from 'src/app/task/task-board/task-board.component';

@Component({
  selector: 'iteration-list',
  standalone: true,
  imports: [CommonModule, IterationItemComponent, TaskBoardComponent],
  templateUrl: 'iteration-list.component.html' 
})
export class IterationListComponent implements OnInit, OnDestroy{
  iterations$: Observable<Array<IterationModel>> = this.store.select(selectIterations)
  tasks$!: Observable<Array<TaskModel>>
  isLoadingTasks$!: Observable<boolean | null>

  constructor(private readonly store: Store) {}

  ngOnInit() {
    console.log('Hello')
    this.isLoadingTasks$ = this.store.select(selectLoading)
    this.store.select(selectIterationId).subscribe(id => {
      this.tasks$ = this.store.select(selectIterationTasks(id ? +id : -1 ))   
    })
  }

  ngOnDestroy() {}
}
