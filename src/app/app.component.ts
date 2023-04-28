import { Component } from '@angular/core';
import { HeaderComponent, FooterComponent } from './shared/layout';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html' ,
    styleUrls: ['../styles.scss'],
    standalone: true,
    imports: [ HeaderComponent, FooterComponent, ]
})
export class AppComponent {
  title = 'scrum-manager';
}
