import { Component, Input } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';

import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem, } from '@angular/cdk/drag-drop';

import { ProjectModel } from '../project.model';

@Component({
  selector: 'project-page',
  standalone: true,
  imports: [CommonModule, DragDropModule, NgFor, NgIf],
  templateUrl: 'project-page.component.html'
})
export class ProjectPageComponent {
  @Input() project!: ProjectModel

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
