import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IccTabComponent, IccTabGroupComponent } from '@icc/ui/tabs';

@Component({
  selector: 'app-tab-group',
  template: `
    <icc-tab-group icc-stretch-tabs="true" icc-align-tabs="start">
      <icc-tab label="First">Content 1</icc-tab>
      <icc-tab label="Second">Content 2</icc-tab>
      <icc-tab label="Third">Content 3</icc-tab>
    </icc-tab-group>
  `,
  styles: [':host {  display: flex; flex-direction: column; width: 100%; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IccTabComponent, IccTabGroupComponent],
})
export class AppTabGroupComponent {}
