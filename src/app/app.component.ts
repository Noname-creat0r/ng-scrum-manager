import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router,  } from '@angular/router';
import { Store } from '@ngrx/store';

import { HeaderComponent } from './shared/layout/header/header.component';
import { ContentContainerComponent } from './shared/layout/content-container/content-container.component';
import { FooterComponent } from './shared/layout/footer/footer.component';

import { LoadingProjectsActions } from './project/store/project.actions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html' ,
    styleUrls: ['../styles.scss'],
    standalone: true,
    imports: [ HeaderComponent, RouterOutlet, FooterComponent, ContentContainerComponent]
})
export class AppComponent implements OnInit {

  constructor(private readonly store: Store) {}

  ngOnInit() {
    //this.store.dispatch(LoadingProjectsActions.initialized({ userId: undefined }))
  }

}
