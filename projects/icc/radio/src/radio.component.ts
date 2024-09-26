import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'icc-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class IccRadioComponent implements OnInit {
  @Input() field!: FormControl;
  @Input() value!: string;
  @Input() checked!: boolean;
  @Input() name!: string;
  private _disabled = false;

  ngOnInit() {
    // console.log('ctrl', this.ctrl);
  }

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(disabled: boolean) {
    this._disabled = disabled;
    // this.cd.markForCheck();
  }
}
