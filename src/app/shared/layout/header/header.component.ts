import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';

import { SignInComponent } from '../../../auth/index';
import { LogoutComponent } from 'src/app/auth/logout/logout.component';
import { selectIsAuthenticated } from 'src/app/auth/store/auth.reducer';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: 'header.template.html',
  imports: [CommonModule, NgIf],
})
export class HeaderComponent {
  username: string | null = null;
  state: string = 'shown';
  isAuth$ = this.store.select(selectIsAuthenticated);

  constructor(
    private modalService: NgbModal,
    private readonly store: Store) {
  }

  onToggleToolbar() {
    this.state = this.state === 'shown' ? 'hidden' : 'shown';
  }

  onShowSignInModal() {
    this.modalService.open(SignInComponent, { size: 'sm', backdrop: 'static' });
  }

  onShowLogoutDialog() {
    this.modalService.open(LogoutComponent, { size: 'sm' });
  }

}
