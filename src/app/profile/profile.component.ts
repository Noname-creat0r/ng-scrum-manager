import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

import { ProjectControlComponent } from '../project/project-control/project-control.component';
import { ProjectListComponent } from '../project/project-list/project-list.component';
import { ProfileModel } from './profile.model';

import { selectFilteredUserProjects, selectUserProjects } from '../project/store/project.reducer';
import { LoadingProfileActions } from './store/profile.actions';
import { selectUser } from './store/profile.reducer';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ProjectListComponent, ProjectControlComponent],
  templateUrl: 'profile.component.html'  
})
export class ProfileComponent implements OnInit {
  mode: 'public' | 'private' = 'public'
  
  profile$ = this.store.select(selectUser)

  publicProjects$ = this.store.select(selectFilteredUserProjects(
    parseInt(localStorage.getItem('userId')!), false
  ))
  privateProjects$ = this.store.select(selectFilteredUserProjects(
    parseInt(localStorage.getItem('userId')!), true
  ))

  constructor(
    private readonly store: Store,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.store.dispatch(LoadingProfileActions.initialized({ 
      userId: parseInt(localStorage.getItem('userId')!) 
    }))
  }

  onSwitchMode() {
    if (this.mode === 'public') this.mode = 'private'
    else this.mode = 'public'
  }
}
