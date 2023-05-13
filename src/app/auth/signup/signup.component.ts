import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { SignUpActions } from '../store/auth.actions';
import { selectLoading } from '../store/auth.reducer';
import { AuthService } from '../auth.service';


@Component({
   selector: 'app-signup',
   templateUrl: 'signup.component.html',
   standalone: true,
   imports: [CommonModule, ReactiveFormsModule]
})

export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  isLoading$ = this.store.select(selectLoading);

  constructor(
    private authService: AuthService,
    private readonly store: Store 
  ) {}

   ngOnInit() {
      this.signUpForm = new FormGroup({ 
         'username': new FormControl(null, [Validators.required, Validators.maxLength(45)] ),
         'email': new FormControl(null, [Validators.required, Validators.email]),
         'password': new FormControl(null, [
            Validators.required, 
            Validators.minLength(8),
            Validators.maxLength(30)
         ]),
      });
   }
  
  getFormValues() : { name: string, email: string, password: string} {
    return {
      name: this.signUpForm.get('username')?.value,
      email: this.signUpForm.get('email')?.value,
      password: this.signUpForm.get('password')?.value
    };
  }


  onSubmit() {
    this.store.dispatch(SignUpActions.initialized({
      email: this.signUpForm.get('email')?.value,
      password: this.signUpForm.get('password')?.value,
      name: this.signUpForm.get('username')?.value
    }));  
  }
}
