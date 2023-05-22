import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ProjectModel } from '../../project.model';

@Component({
  selector: 'project-item',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: 'project-item.component.html'
})
export class ProjectItemComponent {
  @Input() project!: ProjectModel
}
