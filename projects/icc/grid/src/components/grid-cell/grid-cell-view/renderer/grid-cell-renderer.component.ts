import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, inject } from '@angular/core';
import { IccColumnConfig, IccGridConfig } from '../../../../models/grid-column.model';

@Component({
  selector: 'icc-grid-cell-renderer',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.grid-cell-align-center]': 'align === "center"',
    '[class.grid-cell-align-right]': 'align === "right"',
  },
  imports: [CommonModule],
})
export class IccGridCellRendererComponent<T> {
  protected changeDetectorRef = inject(ChangeDetectorRef);
  private _record!: T;

  @Input() gridConfig!: IccGridConfig;
  @Input() rowIndex!: number;
  @Input() column!: IccColumnConfig;

  @Input()
  set record(data: T) {
    this._record = data;
    this.changeDetectorRef.markForCheck();
  }
  get record(): T {
    return this._record;
  }

  get data(): T {
    return (this.record as { [index: string]: T })[this.column.name];
  }

  get align(): string {
    return this.column.align ? this.column.align : 'left';
  }

  get alignCenter() {
    return this.align === 'center';
  }

  get alignRight() {
    return this.align === 'right';
  }
}
