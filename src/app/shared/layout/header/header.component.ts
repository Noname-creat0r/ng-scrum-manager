import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SignInComponent } from '../../../auth/index';
import { slideYAnimation } from '../../animations/toolbar-slide.animation';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: 'header.template.html',
  imports: [CommonModule],
  animations: [slideYAnimation]
})
export class HeaderComponent {
  username: string | null = null;
  unauth: boolean = false;
  state: string = 'shown';

  constructor(private modalService: NgbModal) { }

  onToggleToolbar() {
    this.state = this.state === 'shown' ? 'hidden' : 'shown'
  }

  onShowSignInModal() {
    this.modalService.open(SignInComponent, { size: 'sm' })
  }

}
