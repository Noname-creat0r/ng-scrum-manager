import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Subscription } from 'rxjs';
import { selectProject } from 'src/app/project/store/project.reducer';
import { SignInActions } from '../store/auth.actions';

import { profilePaths } from 'src/app/profile/profile.routes';
import { projectPaths } from 'src/app/project/project.routes';
import { ProjectModel } from 'src/app/project/project.model';
import { homePaths } from 'src/app/home/home.routes';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'logout.component.html',
})
export class LogoutComponent implements OnInit, OnDestroy{

  currentProject: ProjectModel | undefined = undefined
  projectSub!: Subscription

  constructor(
    public activeModal: NgbActiveModal,
    private router: Router,
    private readonly store: Store) { }

  ngOnInit() {
    this.projectSub = this.store.select(selectProject()).subscribe(project => {
      this.currentProject = project
    })
  }

  ngOnDestroy() {
    this.projectSub.unsubscribe()
  }

  onLogout() {
    this.store.dispatch(SignInActions.logout())
    this.activeModal.close();

    if (this.router.isActive(profilePaths.base, true)) {
      this.router.navigateByUrl(homePaths.base)
    } else if (this.router.isActive(projectPaths.base, false) && this.currentProject?.private) {
      this.router.navigateByUrl(projectPaths.base) 
    }

  }
}
