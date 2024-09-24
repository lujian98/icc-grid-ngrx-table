import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IccFormComponent, defaultFormConfig } from '@icc/ui/form';
import { IccCheckboxComponent } from '@icc/ui/checkbox';
import { IccNumberFieldComponent, defaultNumberFieldConfig } from '@icc/ui/fields';

@Component({
  selector: 'app-theme-form',
  templateUrl: './theme-form.component.html',
  styleUrls: ['./theme-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IccFormComponent, IccNumberFieldComponent, IccCheckboxComponent],
})
export class AppThemeFormDemoComponent {
  checked = true;

  fieldConfig = {
    ...defaultNumberFieldConfig,
    fieldLabel: 'Number Field',
    placeholder: 'Search ...',
  };
}
