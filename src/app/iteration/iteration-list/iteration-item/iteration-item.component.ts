import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';

import { IterationModel } from '../../iteration.model';
import { DeletingIterationActions, IterationActions } from '../../store/iteration.actions';
import { IterationService } from '../../iteration.service';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IterationControlComponent } from '../../iteration-control/iteration-control.component';

@Component({
  selector: 'iteration-item',
  standalone: true,
  imports: [CommonModule, IterationControlComponent],
  templateUrl: 'iteration-item.component.html' 
})
export class IterationItemComponent {
  @Input() iteration!: IterationModel
  @Input() selected!: Boolean

  constructor(
    private readonly store: Store,
    private iterationService: IterationService,
    private modalService: NgbModal) {}

  onIterationClicked() {
    this.store.dispatch(IterationActions.selected({ iterationId: this.iteration.id }))
    const obs = new Observable((subscribe) => {
      setTimeout(() => {
        subscribe.next()
        this.store.dispatch(IterationActions.loaded())
        subscribe.complete()
      }, 800)
    })
    obs.subscribe()
  }

  onEdit() {
    this.modalService.open(IterationControlComponent)  
  }
  
  onDelete() {
    this.store.dispatch(DeletingIterationActions.initialized({ id: this.iteration.id}))
  }
}
