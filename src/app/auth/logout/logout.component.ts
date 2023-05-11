import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { SignInActions } from '../store/auth.actions';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'logout.component.html',
})
export class LogoutComponent {

  constructor(public activeModal: NgbActiveModal, private readonly store: Store) { }

  onLogout() {
     this.store.dispatch(SignInActions.logout())
     this.activeModal.close();
  }
}
