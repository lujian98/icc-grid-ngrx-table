import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataSource } from '@angular/cdk/collections';
import { CdkTableModule } from '@angular/cdk/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { IccColumnConfig } from '../../models/grid-column.model';
import { IccTableHeaderComponent } from '../table-header/table-header.component';


@Component({
  selector: 'icc-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    IccTableHeaderComponent,
    //CdkTableModule,
  ],
})
export class IccTableComponent {
  @Input() columnConfig: IccColumnConfig[] = [];

  get displayedColumns():  string[] {
    return this.columnConfig.map((column)=> column.field);
  }
}
