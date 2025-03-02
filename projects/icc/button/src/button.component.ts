import { ChangeDetectionStrategy, Component, Input, ElementRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

export type IccButtonStatus = 'default' | 'primary' | 'danger';

@Component({
  selector: 'button[icc-button], a[icc-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  host: {
    '[class.status-default]': 'status === "default"',
    '[class.status-primary]': 'status === "primary"',
    '[class.status-danger]': 'status === "danger"',
    '[class.size-medium]': 'size === "medium"',
    '[class.size-standard]': 'size === "standard"',
    '[class.appearance-ghost]': 'appearance === "ghost"',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class IccButtonComponent {
  private elementRef = inject(ElementRef<HTMLElement>);

  @Input() status: IccButtonStatus = 'default';
  @Input() appearance!: string;

  get default() {
    return this.status === 'default';
  }

  @Input()
  get ghost(): boolean {
    return this.appearance === 'ghost';
  }
  set ghost(value: boolean) {
    if (coerceBooleanProperty(value)) {
      this.appearance = 'ghost';
    }
  }
}
