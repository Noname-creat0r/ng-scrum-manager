import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { HeaderComponent, FooterComponent } from './shared/layout';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html' ,
    styleUrls: ['../styles.scss'],
    standalone: true,
    imports: [ HeaderComponent, RouterOutlet, FooterComponent, ]
})
export class AppComponent {
  title = 'scrum-manager';
}
