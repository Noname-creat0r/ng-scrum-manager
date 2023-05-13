import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  projects = [
    {
      title: 'hellnaw',
      description: 'lol',
      id: '#ad12dad',
      tags: [ { type: 'bg-warning', text: 'important' }, { type: 'bg-primary', text: 'main'} ]
    },
    {
      title: 'hellnaw',
      description: 'lol',
      id: '#ad12dad',
      tags: []
    },
    {
      title: 'hellnaw',
      description: 'Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatatdawdawdawddddddddddddddddddddddddddddddddddddddddddddddddddddddd adw.',
      id: '#ad12dad',
      tags: []
    }
  ] 
}
