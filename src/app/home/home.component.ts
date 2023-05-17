import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Store } from '@ngrx/store';

import { selectProjects } from '../project/store/project.reducer';
import { LoadingProjectsActions } from '../project/store/project.actions';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  projects$ = this.store.select(selectProjects);

  constructor(private readonly store: Store) {}

  ngOnInit() {
    this.store.dispatch(LoadingProjectsActions.initialized({ userId: undefined }))
  }  
}
