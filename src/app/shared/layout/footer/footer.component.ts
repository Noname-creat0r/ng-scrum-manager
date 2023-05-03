import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: 'footer.component.html',
  imports: [CommonModule],
})
export class FooterComponent {
  state: string = 'shown';

  onToggleToolbar() {
    this.state = this.state === 'shown' ? 'hidden' : 'shown'
  } 
}
