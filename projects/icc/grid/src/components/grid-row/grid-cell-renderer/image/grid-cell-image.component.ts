import { ChangeDetectorRef, ChangeDetectionStrategy, Component, HostBinding, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IccColumnConfig, IccGridConfig } from '../../../../models/grid-column.model';

@Component({
  selector: 'icc-grid-cell-image',
  templateUrl: './grid-cell-image.component.html',
  styleUrls: ['./grid-cell-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
})
export class IccGridCellImageComponent<T> {
  private changeDetectorRef = inject(ChangeDetectorRef);
  private _record!: T;
  @Input() gridConfig!: IccGridConfig;
  @Input() column!: IccColumnConfig;

  //imageUrl = 'https://assets.pernod-ricard.com/nz/media_images/test.jpg?hUV74FvXQrWUBk1P2.fBvzoBUmjZ1wct';
  //imageUrl = 'assets/rxjs-maps-usage.jpg';

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

  get rowHeight(): number {
    return this.gridConfig.rowHeight - 10;
  }

  get align(): string {
    return this.column.align ? this.column.align : 'left';
  }

  @HostBinding('class.grid-cell-image-align-center')
  get alignCenter() {
    return this.align === 'center';
  }

  @HostBinding('class.grid-cell-image-align-right')
  get alignRight() {
    return this.align === 'right';
  }
}
