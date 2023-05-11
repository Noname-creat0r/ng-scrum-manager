import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
   selector: 'app-signup',
   templateUrl: 'signup.component.html',
   standalone: true,
   imports: [CommonModule, ReactiveFormsModule]
})

export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;

  constructor(private authService: AuthService) {}

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
    this.authService.signup(this.getFormValues());
    console.log(this.getFormValues());
  }
}
