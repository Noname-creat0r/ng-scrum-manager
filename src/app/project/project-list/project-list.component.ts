import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';

import { LoadingProjectsActions } from '../store/project.actions';
import { selectProjects } from '../store/project.reducer';
import { selectIsAuthenticated, selectUserId } from 'src/app/auth/store/auth.reducer';

import { ProjectItemComponent } from './project-item/project-item.component';

@Component({
  selector: 'project-list',
  standalone: true,
  imports: [CommonModule, ProjectItemComponent],
  templateUrl: 'project-list.component.html' 
})
export class ProjectListComponent {
  @Input() projects$ = this.store.select(selectProjects);
  isAuthenticated$ = this.store.select(selectIsAuthenticated);
  userId$ = this.store.select(selectUserId)

  constructor(private readonly store: Store) {}

  ngOnInit() {
    this.store.dispatch(LoadingProjectsActions.initialized({ userId: undefined }))
  }  
 
}
