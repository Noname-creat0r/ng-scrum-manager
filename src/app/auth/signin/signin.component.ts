import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { authRoutes } from '../auth.routes';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
   selector: 'app-signin-modal',
   standalone: true,
   templateUrl: 'signin.component.html',
   imports: [CommonModule, ReactiveFormsModule, RouterLink],
})

export class SignInComponent implements OnInit {
   signInForm!: FormGroup
   authRoutes: typeof authRoutes
   
   constructor(public activeModal: NgbActiveModal,) { 
      this.authRoutes = authRoutes
   }

   ngOnInit() {
      this.signInForm = new FormGroup({ 
         'email': new FormControl(null, [Validators.required, Validators.email]),
         'password': new FormControl(null, [
            Validators.required, 
            Validators.minLength(8),
            Validators.maxLength(30)
         ]),
      });
  
   }

   onSubmit() {

   }
   
}