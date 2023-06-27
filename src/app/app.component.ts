import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet,  ChildrenOutletContexts  } from '@angular/router';
import { Store } from '@ngrx/store';

import { HeaderComponent } from './shared/layout/header/header.component';
import { ContentContainerComponent } from './shared/layout/content-container/content-container.component';
import { FooterComponent } from './shared/layout/footer/footer.component';

import { LoadingProjectsActions } from './project/store/project.actions';

import { slider } from './shared/animations/route-transition.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html' ,
  styleUrls: ['../styles.scss'],
  standalone: true,
  imports: [ RouterOutlet, CommonModule, HeaderComponent, FooterComponent, ContentContainerComponent],
  animations: [ slider ]
})
export class AppComponent implements OnInit {

  constructor(
    private readonly store: Store,
    private contexts: ChildrenOutletContexts) {}

  ngOnInit() {
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation']
  } 
}
