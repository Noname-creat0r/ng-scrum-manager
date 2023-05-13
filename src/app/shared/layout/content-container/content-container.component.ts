import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-content-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="content-container">
      <ng-content></ng-content>
    <div>
  `,
})
export class ContentContainerComponent {

}
