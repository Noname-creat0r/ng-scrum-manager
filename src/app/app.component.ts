import { Component } from '@angular/core';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent} from "./layout/footer/footer.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html' ,
    styleUrls: ['../styles.scss'],
    standalone: true,
    imports: [HeaderComponent, FooterComponent]
})
export class AppComponent {
  title = 'scrum-manager';
}
