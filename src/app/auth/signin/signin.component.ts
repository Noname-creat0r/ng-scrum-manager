import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
   selector: 'app-signin-modal',
   standalone: true,
   templateUrl: 'signin.component.html',
   imports: [CommonModule],
})

export class SignInComponent {
   constructor(public activeModal: NgbActiveModal) { }

   auth() {}
   
}