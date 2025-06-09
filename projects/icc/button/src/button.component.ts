import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

export type IccButtonStatus = 'default' | 'primary' | 'danger';

@Component({
  selector: 'button[icc-button], a[icc-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  host: {
    '[class.status-default]': 'status() === "default"',
    '[class.status-primary]': 'status() === "primary"',
    '[class.status-danger]': 'status() === "danger"',
    '[class.appearance-ghost]': 'appearance() === "ghost"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IccButtonComponent {
  status = input<IccButtonStatus>('default');
  ghost = input(false, {
    transform: (ghost: boolean) => {
      this.appearance.set(ghost ? 'ghost' : '');
      return ghost;
    },
  });
  appearance = signal<string>('');
}
