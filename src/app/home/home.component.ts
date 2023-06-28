import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';

import { selectIsAuthenticated } from '../auth/store/auth.reducer';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  
  isAuth$ = this.store.select(selectIsAuthenticated)

  constructor(private readonly store: Store) { }

  ngOnInit() { }  

}
