import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: 'header.template.html',
  imports: [CommonModule],
})
export class HeaderComponent {
  username: string = 'Username';
}
