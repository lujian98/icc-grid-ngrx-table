import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataSource } from '@angular/cdk/collections';
import { CdkTableModule } from '@angular/cdk/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { IccColumnConfig } from '../models/grid-column.model';
import { IccGridHeaderComponent } from './grid-header/grid-header.component';
import { IccGridRowComponent } from './grid-row/grid-row.component';

@Component({
  selector: 'icc-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    IccGridHeaderComponent,
    IccGridRowComponent,
  ],
})
export class IccGridViewComponent {
  @Input() columnConfig: IccColumnConfig[] = [];
  @Input() gridRows: any[] = [];

  get displayedColumns():  string[] {
    return this.columnConfig.map((column)=> column.field);
  }
}
