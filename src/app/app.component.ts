import { Component } from '@angular/core';
import { RouterOutlet, Router,  } from '@angular/router';

import { HeaderComponent } from './shared/layout/header/header.component';
import { ContentContainerComponent } from './shared/layout/content-container/content-container.component';
import { FooterComponent } from './shared/layout/footer/footer.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html' ,
    styleUrls: ['../styles.scss'],
    standalone: true,
    imports: [ HeaderComponent, RouterOutlet, FooterComponent, ContentContainerComponent]
})
export class AppComponent {

}
