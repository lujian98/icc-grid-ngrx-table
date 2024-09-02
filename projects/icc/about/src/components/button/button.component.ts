import { Component, Input } from '@angular/core';

@Component({
  selector: 'icc-about-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class IccButtonComponent {
  @Input() label = 'Accept';
  //label = 'Accept';
}
