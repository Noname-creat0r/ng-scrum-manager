import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SignInComponent } from '../../../auth/index';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: 'header.template.html',
  imports: [CommonModule],
})
export class HeaderComponent {
  username: string | null = null;
  unauth: boolean = false;

  constructor(private modalService: NgbModal) { }

  showSignInModal() {
    this.modalService.open(SignInComponent, { size: 'sm' })
  }

}
