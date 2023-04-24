import { Component } from '@angular/core';
import { HeaderComponent } from './layout/header/header.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html' ,
    styleUrls: ['../styles.scss'],
    standalone: true,
    imports: [HeaderComponent]
})
export class AppComponent {
  title = 'scrum-manager';
}
