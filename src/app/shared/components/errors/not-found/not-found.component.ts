import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container not-found ">
      <h2 class="display-2 header-primary">Oh, boi... page not found</h2>
      <p> This is a dead end, i guess. </p> 
    </div>
  `
})
export class NotFoundComponent {

}
