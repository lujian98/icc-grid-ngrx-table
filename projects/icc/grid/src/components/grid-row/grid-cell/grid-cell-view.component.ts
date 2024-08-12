import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataSource } from '@angular/cdk/collections';
import { CdkTableModule } from '@angular/cdk/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { IccColumnConfig } from '../../../models/grid-column.model';


@Component({
  selector: 'icc-grid-cell-view',
  templateUrl: './grid-cell-view.component.html',
  styleUrls: ['./grid-cell-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    CdkTableModule,
  ],
})
export class IccGridCellViewComponent {
  @Input() column!: IccColumnConfig;
  @Input() record: any;

  get data(): any {
    return this.record[this.column.name];
  }
}
