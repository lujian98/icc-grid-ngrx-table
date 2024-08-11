import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataSource } from '@angular/cdk/collections';
import { CdkTableModule } from '@angular/cdk/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { IccColumnConfig } from '../../models/grid-column.model';
import { IccTableHeaderCellComponent } from '../table-header-cell/table-header-cell.component';

@Component({
  selector: 'icc-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    IccTableHeaderCellComponent,
  ],
})
export class IccTableHeaderComponent {
  @Input() columnConfig: IccColumnConfig[] = [];

  get displayedColumns():  string[] {
    return this.columnConfig.map((column)=> column.field);
  }

  trackByIndex(tmp: any, index: number): number {
    console.log( 'tmp=', tmp)
    return index;
  }
}
