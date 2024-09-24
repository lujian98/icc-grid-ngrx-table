import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IccFormComponent, defaultFormConfig } from '@icc/ui/form';
import { IccCheckboxComponent } from '@icc/ui/checkbox';
import {
  IccNumberFieldComponent,
  defaultNumberFieldConfig,
  IccDisplayFieldComponent,
  IccDisplayFieldConfig,
  defaultDisplayFieldConfig,
} from '@icc/ui/fields';

@Component({
  selector: 'app-theme-form',
  templateUrl: './theme-form.component.html',
  styleUrls: ['./theme-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IccFormComponent, IccNumberFieldComponent, IccDisplayFieldComponent, IccCheckboxComponent],
})
export class AppThemeFormDemoComponent {
  checked = true;

  numberConfig = {
    //...defaultNumberFieldConfig,
    fieldLabel: 'Number Field',
  };
  numberValue = 50;

  displayConfig = {
    fieldLabel: 'Display Field',
  };
  diaplayValue = 'Test Display field';
}
