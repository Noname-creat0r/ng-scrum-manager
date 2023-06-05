import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { select, Store } from '@ngrx/store';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, Subscription } from 'rxjs';

import { selectCurrentProjectId, selectProject } from '../store/project.reducer';
import { selectTasks, selectLoading } from 'src/app/task/store/task.reducer';

import { LoadingProjectsActions } from '../store/project.actions';
import { LoadingTasksActions } from 'src/app/task/store/task.actions';

import {  TaskModel } from 'src/app/task/task.model';
import { ProjectModel } from '../project.model';
import { TaskBoardComponent } from 'src/app/task/task-board/task-board.component';

@Component({
  selector: 'project-page',
  standalone: true,
  imports: [CommonModule, TaskBoardComponent ],
  templateUrl: 'project-page.component.html'
})
export class ProjectPageComponent implements OnInit, OnDestroy {
  project$!: Observable<ProjectModel | undefined> 
  isLoadingTasks$!: Observable<boolean>
  tasks$!: Observable<Array<TaskModel>>  
  
  projectIdSub!: Subscription

  constructor(private readonly store: Store) { }

  ngOnInit() {
    // load project
    this.store.dispatch(LoadingProjectsActions.initialized({ userId: undefined })) 
    
    this.project$ = this.store.select(selectProject())
    this.tasks$ = this.store.select(selectTasks)
    this.isLoadingTasks$ = this.store.select(selectLoading)
    
    this.projectIdSub = this.store.select(selectCurrentProjectId).subscribe(id => {
      this.store.dispatch(LoadingTasksActions.initialized({ projectId: id?.toString()}))
    }) 
  }

  ngOnDestroy() {
    this.projectIdSub.unsubscribe()
  }
  
} 
