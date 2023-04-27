import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalComponent } from "../../components/modal/modal.component";

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: 'header.template.html',
  imports: [CommonModule, ModalComponent],
})
export class HeaderComponent {
  username: string | null = null;
  unauth: boolean = false;
  showAuthModal: boolean = false;

  onShowAuthModal() {
    this.showAuthModal = !this.showAuthModal;
  }
}
