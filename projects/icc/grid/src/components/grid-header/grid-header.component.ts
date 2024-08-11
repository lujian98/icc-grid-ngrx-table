import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataSource } from '@angular/cdk/collections';
import { CdkTableModule } from '@angular/cdk/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { IccColumnConfig } from '../../models/grid-column.model';
import { IccGridHeaderCellComponent } from '../grid-header-cell/grid-header-cell.component';

@Component({
  selector: 'icc-grid-header',
  templateUrl: './grid-header.component.html',
  styleUrls: ['./grid-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    IccGridHeaderCellComponent,
  ],
})
export class IccGridHeaderComponent {
  @Input() columnConfig: IccColumnConfig[] = [];

  get displayedColumns():  string[] {
    return this.columnConfig.map((column)=> column.field);
  }

  trackByIndex(tmp: any, index: number): number {
    console.log( 'tmp=', tmp)
    return index;
  }
}
