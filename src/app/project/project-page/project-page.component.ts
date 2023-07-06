import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';

import { selectCurrentProjectId, selectProject } from '../store/project.reducer';
import { selectTasks, selectLoading } from 'src/app/task/store/task.reducer';

import { LoadingProjectsActions } from '../store/project.actions';
import { LoadingTasksActions, TaskActions } from 'src/app/task/store/task.actions';
import { IterationActions, LoadingIterationsActions } from 'src/app/iteration/store/iteration.actions';

import { TaskModel } from 'src/app/task/task.model';
import { ProjectModel } from '../project.model';

import { TaskBoardComponent } from 'src/app/task/task-board/task-board.component';
import { TaskControlComponent } from 'src/app/task/task-control/task-control.component';
import { IterationListComponent } from 'src/app/iteration/iteration-list/iteration-list.component';
import { IterationControlComponent } from 'src/app/iteration/iteration-control/iteration-control.component';

@Component({
  selector: 'project-page',
  standalone: true,
  imports: [CommonModule, TaskBoardComponent, TaskControlComponent, 
    IterationControlComponent, IterationListComponent ],
  templateUrl: 'project-page.component.html'
})
export class ProjectPageComponent implements OnInit, OnDestroy {
  project$!: Observable<ProjectModel | undefined> 
  isLoadingTasks$!: Observable<boolean>
  tasks$!: Observable<Array<TaskModel>>  
   
  projectIdSub!: Subscription
  
  mode: 'iteration' | 'backlog' | 'task' = 'backlog';

  constructor(
    private readonly store: Store,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.project$ = this.store.select(selectProject())
    this.tasks$ = this.store.select(selectTasks)
    this.isLoadingTasks$ = this.store.select(selectLoading)
    
    this.projectIdSub = this.store.select(selectCurrentProjectId).subscribe(id => {
      this.store.dispatch(LoadingProjectsActions.initialized({ projectId: id?.toString() })) 
      this.store.dispatch(LoadingTasksActions.initialized({ projectId: id?.toString() }))
      this.store.dispatch(LoadingIterationsActions.initialized({ projectId: id?.toString() }))
    }) 
  }

  ngOnDestroy() {
    this.projectIdSub.unsubscribe()
  }
 
  onSwitchMode() {
    if (this.mode === 'backlog') this.mode = 'iteration'
    else this.mode = 'backlog'
  }

  onAdd() {
    
    if (this.mode === 'backlog') { 
      this.store.dispatch(TaskActions.deselected())
      this.modalService.open(TaskControlComponent)
    } else {
      this.store.dispatch(IterationActions.deselected())
      this.modalService.open(IterationControlComponent)
    }
  }
} 
