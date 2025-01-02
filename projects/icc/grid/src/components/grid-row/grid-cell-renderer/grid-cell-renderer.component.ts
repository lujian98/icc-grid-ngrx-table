import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input, inject } from '@angular/core';
import { IccColumnConfig, IccGridConfig } from '../../../models/grid-column.model';

@Component({
  selector: 'icc-grid-cell-renderer',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class IccGridCellRendererComponent<T> {
  private changeDetectorRef = inject(ChangeDetectorRef);
  private _record!: T;

  @Input() gridConfig!: IccGridConfig;
  @Input() column!: IccColumnConfig;

  @Input()
  set record(data: T) {
    this._record = { ...data };
    this.changeDetectorRef.markForCheck();
  }
  get record(): T {
    return this._record;
  }

  get data(): T {
    return (this.record as any)[this.column.name];
  }

  get align(): string {
    return this.column.align ? this.column.align : 'left';
  }

  @HostBinding('class.grid-cell-align-center')
  get alignCenter() {
    return this.align === 'center';
  }

  @HostBinding('class.grid-cell-align-right')
  get alignRight() {
    return this.align === 'right';
  }
}
