import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: '<h1>It is working. {{title}} </h1>',
    standalone: true,
})
export class AppComponent {
  title = 'scrum-manager';
}
