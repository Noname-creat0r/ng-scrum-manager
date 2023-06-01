import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem, } from '@angular/cdk/drag-drop';

import { ProjectModel } from '../project.model';
import { selectProject, selectCurrentProjectId } from '../store/project.reducer';
import { Observable, Subject, Subscription } from 'rxjs';

import { LoadingProjectsActions } from '../store/project.actions';
@Component({
  selector: 'project-page',
  standalone: true,
  imports: [CommonModule, DragDropModule, NgFor, NgIf],
  templateUrl: 'project-page.component.html'
})
export class ProjectPageComponent implements OnInit, OnDestroy {
  project$!: Observable<ProjectModel | undefined> 
  
  boardContainers = [
    { 
      title: 'Todo',
      data: [{
        disabled: true,
        content: '+'
      }]
    }, {
      title: 'Doing',
      data: [
        {
          disabled: true,
          content: '+'
        },
        { content: 'testing'},
        { content: 'tes' }
      ],
    }, {
      title: 'Done',
      data: [{
        disabled: true,
        content: '+'
      }]
    }
  ]
  
  constructor(
    private readonly store: Store,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.store.dispatch(LoadingProjectsActions.initialized({ userId: undefined }))
    this.project$ = this.store.select(selectProject())
 
  }
  
  ngOnDestroy() {
  }


  drop(event: CdkDragDrop<Array<{content: string, disabled?: boolean}>>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex)
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex)
    }
  }

  // creat task component 
  // on click projectItem action - set current prj id in reducer
  // get current project here through selector
  // load iterations + backlog tasks

} 
