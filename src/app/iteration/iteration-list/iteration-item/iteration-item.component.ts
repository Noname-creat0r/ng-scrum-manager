import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';

import { IterationModel } from '../../iteration.model';
import { IterationActions } from '../../store/iteration.actions';
import { IterationService } from '../../iteration.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'iteration-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'iteration-item.component.html' 
})
export class IterationItemComponent {
  @Input() iteration!: IterationModel
  @Input() selected!: Boolean

  constructor(private readonly store: Store, private iterationService: IterationService) {}

  onIterationClicked() {
    this.store.dispatch(IterationActions.selected({ iterationId: this.iteration.id }))
    const obs = new Observable((subscribe) => {
      setTimeout(() => {
        subscribe.next()
        this.store.dispatch(IterationActions.loaded())
        subscribe.complete()
      }, 1000)
    })
    obs.subscribe()
  }
}
