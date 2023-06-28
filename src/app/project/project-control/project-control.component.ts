import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';

import { ProjectModel } from '../project.model';
import { selectUserId } from 'src/app/auth/store/auth.reducer';
import { AddingProjectActions } from '../store/project.actions';

@Component({
  selector: 'project-control',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: 'project-control.component.html'
})
export class ProjectControlComponent implements OnInit {  
  projectForm!: FormGroup
  userId!: number

  userId$ = this.store.select(selectUserId)

  constructor(
    private readonly store: Store,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.projectForm = new FormGroup({ 
      'title': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [
        Validators.required, 
        Validators.minLength(1),
        Validators.maxLength(512)
      ]),
      'private': new FormControl(false)
    });

    this.userId$.subscribe(id => { this.userId = parseInt(id!) })
  }

  onSubmit() {
    const project: ProjectModel = {
      id: 0,
      title: this.projectForm.get('title')?.value,
      description: this.projectForm.get('description')?.value,
      authorId: this.userId,
      private: this.projectForm.get('private')?.value
    }

    this.store.dispatch(AddingProjectActions.initialized({ project: project }))
  }
}
