import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataSource } from '@angular/cdk/collections';
import { CdkTableModule } from '@angular/cdk/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { IccButtonModule } from '@icc/ui/button';
import { IccColumnConfig } from '../../../models/grid-column.model';


@Component({
  selector: 'icc-grid-header-cell',
  templateUrl: './grid-header-cell.component.html',
  styleUrls: ['./grid-header-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    CdkTableModule,
  ],
})
export class IccGridHeaderCellComponent {
  @Input() column!: IccColumnConfig;

  @Output() sortGrid = new EventEmitter<any>();
  @Output() filterGrid = new EventEmitter<any>();

  get title(): string {
    //console.log('title =', this.column.title)
    return this.column.title === undefined ? this.column.name : this.column.title;
  }

  get downCaretStyle() {
    return {'border-top': '5px solid rgba(16, 46, 84, 0.8)'};
    //return {'border-top': sortDescending(this.sortType) ? '5px solid rgba(16, 46, 84, 0.8)' : null};
  }

  get upCaretStyle() {
    return {'border-bottom': null};
    //return {'border-bottom': sortAscending(this.sortType) ? '5px solid rgba(16, 46, 84, 0.8)' : null};
  }
}
