import { AfterViewChecked, ChangeDetectionStrategy, Component, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { DataSource } from '@angular/cdk/collections';
import { CdkTableModule } from '@angular/cdk/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { IccColumnConfig } from '../models/grid-column.model';
import { IccGridHeaderComponent } from './grid-header/grid-header.component';
import { IccGridRowComponent } from './grid-row/grid-row.component';

export const FIXED_SIZE = Array(10000).fill(30);

@Component({
  selector: 'icc-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ScrollingModule,
    IccGridHeaderComponent,
    IccGridRowComponent,
  ],
})
export class IccGridViewComponent implements AfterViewChecked {
  @Input() columnConfig: IccColumnConfig[] = [];
  @Input() gridRows: any[] = [];

  fixedSizeData = FIXED_SIZE;

  get displayedColumns():  string[] {
    return this.columnConfig.map((column)=> column.name);
  }

  @ViewChild(CdkVirtualScrollViewport) private viewport!: CdkVirtualScrollViewport;

  ngAfterViewChecked(): void {
    this.viewport.checkViewportSize();
    console.log(' this.viewport=', this.viewport)
  }
}
