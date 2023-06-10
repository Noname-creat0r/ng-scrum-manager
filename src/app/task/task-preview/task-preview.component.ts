import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { TaskModel } from '../task.model';
import { selectTask } from '../store/task.reducer';

@Component({
  selector: 'app-task-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'task-preview.component.html' 
})
export class TaskPreviewComponent implements OnInit, OnDestroy {
  task!: TaskModel | undefined 
  private taskSub!: Subscription

  constructor(private readonly store: Store) {}

  ngOnInit() {
    this.taskSub = this.store.select(selectTask()).subscribe(task => {
      this.task = task 
    })
  }

  ngOnDestroy(){
    this.taskSub.unsubscribe()
  }
}
