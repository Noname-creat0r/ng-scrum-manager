import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
   selector: 'app-signin-modal',
   standalone: true,
   templateUrl: 'signin.component.html',
   imports: [CommonModule, ReactiveFormsModule],
})

export class SignInComponent implements OnInit {
   signInForm!: FormGroup;
  

   constructor(public activeModal: NgbActiveModal) { }

   ngOnInit() {
      this.signInForm = new FormGroup({ 
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