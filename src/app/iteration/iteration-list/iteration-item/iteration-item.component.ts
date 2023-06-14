import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';

import { IterationModel } from '../../iteration.model';
import { IterationActions } from '../../store/iteration.actions';

@Component({
  selector: 'iteration-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'iteration-item.component.html' 
})
export class IterationItemComponent {
  @Input() iteration!: IterationModel

  constructor(private readonly store: Store) {}

  onIterationClicked() {
    this.store.dispatch(IterationActions.selected({ iterationId: this.iteration.id }))
  }
}
