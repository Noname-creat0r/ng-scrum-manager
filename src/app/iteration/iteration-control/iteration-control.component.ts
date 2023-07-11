import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { selectIteration } from '../store/iteration.reducer';
import { selectCurrentProjectId } from 'src/app/project/store/project.reducer';
import { IterationModel } from '../iteration.model';
import { AddingIterationActions, EditingIterationActions } from '../store/iteration.actions';

@Component({
  selector: 'app-iteration-control',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: 'iteration-control.component.html'  
})
export class IterationControlComponent implements OnInit {
  iterationForm!: FormGroup
  iterationId: number | undefined = undefined
  projectId!: number
  public mode: "Add" | "Edit" = "Add"

  constructor(
    public activeModal: NgbActiveModal,
    private readonly store: Store 
  ) {}

  createIterationForm(iteration?: IterationModel) {
    return new FormGroup({
      'title': new FormControl(iteration?.title || null, [Validators.required]),
      'description': new FormControl(iteration?.description || null, [
        Validators.required, 
        Validators.minLength(1),
        Validators.maxLength(512)
      ])
    })
  }

  ngOnInit() {
    this.store.select(selectIteration()).subscribe(iteration => {
      if (iteration) {
        this.mode = "Edit"
        this.iterationId = iteration.id
        this.iterationForm = this.createIterationForm(iteration)
      } else {
        this.mode = "Add"
        this.iterationForm = this.createIterationForm()
      }
    })

    this.store.select(selectCurrentProjectId).subscribe(id => {
      this.projectId = parseInt(id!)
    })
  }

  onSubmit() {
    const iteration: IterationModel = {
      id: this.iterationId!,
      title: this.iterationForm.get('title')?.value,
      description: this.iterationForm.get('description')?.value,
      projectId: this.projectId
    }

    if (this.mode === "Add") {
      this.store.dispatch(AddingIterationActions.initialized({ iteration: iteration}))
    } else {
      this.store.dispatch(EditingIterationActions.initialized({ iteration: iteration}))
    }

    this.activeModal.close()
  }
}
