import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
   selector: 'app-signup',
   templateUrl: 'signup.component.html',
   standalone: true,
   imports: [CommonModule, ReactiveFormsModule]
})

export class SignUpComponent implements OnInit {
   signUpForm!: FormGroup;

   constructor() { }

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

   onSubmit() {

   }
}