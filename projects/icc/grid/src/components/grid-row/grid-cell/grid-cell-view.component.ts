import {
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
import { IccColumnConfig } from '../../../models/grid-column.model';

@Component({
  selector: 'icc-grid-cell-view',
  templateUrl: './grid-cell-view.component.html',
  styleUrls: ['./grid-cell-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, CdkTableModule],
})
export class IccGridCellViewComponent<T> {
  private changeDetectorRef = inject(ChangeDetectorRef);
  private _record!: T;
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
    // console.log(' get record =', this.column.name)
    return (this.record as any)[this.column.name];
  }

  get align(): string {
    return this.column.align ? this.column.align : 'left';
  }

  @HostBinding('class.grid-cell-view-align-center')
  get alignCenter() {
    return this.align === 'center';
  }

  @HostBinding('class.grid-cell-view-align-right')
  get alignRight() {
    return this.align === 'right';
  }
}
