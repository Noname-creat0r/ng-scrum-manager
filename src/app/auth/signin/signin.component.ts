import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { authRoutes } from '../auth.routes';

import { SignInActions } from '../store/auth.actions';
import { selectLoading } from '../store/auth.reducer';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
   selector: 'app-signin-modal',
   standalone: true,
   templateUrl: 'signin.component.html',
   imports: [CommonModule, ReactiveFormsModule, RouterLink],
})

export class SignInComponent implements OnInit {
  signInForm!: FormGroup;
  authRoutes: typeof authRoutes;
  isLoading$ = this.store.select(selectLoading);

  constructor(public activeModal: NgbActiveModal, private readonly store: Store) { 
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
    this.store.dispatch(SignInActions.initialized({
      email: this.signInForm.get('email')?.value,
      password: this.signInForm.get('password')?.value
    }))
    setTimeout(() => this.store.dispatch(SignInActions.succeeded({ token: '1234', userId: 'NewUser'} )), 2000)
  
  }
 
}
