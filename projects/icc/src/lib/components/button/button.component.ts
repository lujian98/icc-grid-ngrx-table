import { Component, Input } from '@angular/core';

@Component({
  selector: 'icc-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  @Input() label = 'Accept';
  //label = 'Accept';
}
