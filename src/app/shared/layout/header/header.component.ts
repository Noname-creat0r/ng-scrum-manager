import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { Route, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';

import { selectIsAuthenticated } from 'src/app/auth/store/auth.reducer';

import { SignInComponent } from '../../../auth/signin/signin.component';
import { LogoutComponent } from 'src/app/auth/logout/logout.component';
import { homePaths } from 'src/app/home/home.routes';

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
    private readonly store: Store,
    private router: Router) {
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

  onLogotypeClick() {
    this.router.navigateByUrl(homePaths.base)
  }
}
