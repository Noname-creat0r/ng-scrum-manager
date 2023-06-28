import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';

import { ProjectModel } from '../../project.model';
import { DeletingProjectActions, ProjectActions } from '../../store/project.actions';

@Component({
  selector: 'project-item',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: 'project-item.component.html'
})
export class ProjectItemComponent {
  @Input() project!: ProjectModel
  @Input() controls!: boolean 

  constructor(private readonly store: Store) {}

  onOpenProjectItem(projectId: number) {
    this.store.dispatch(ProjectActions.selected({ projectId }))
  }

  onDeleteProject() {
    this.store.dispatch(DeletingProjectActions.initialized({ id: this.project.id }))
  }
   
}
