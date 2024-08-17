import { ChangeDetectionStrategy, Component, Input, inject, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { DataSource } from '@angular/cdk/collections';
import { CdkTableModule } from '@angular/cdk/table';
import { interval, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { IccGridFacade } from '../../+state/grid.facade';
import { IccGridRowComponent } from '../grid-row/grid-row.component';
import { IccGridConfig, IccColumnConfig } from '../../models/grid-column.model';

@Component({
  selector: 'icc-grid-viewport',
  templateUrl: './grid-viewport.component.html',
  styleUrls: ['./grid-viewport.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  standalone: true,
  imports: [
    CommonModule,
    ScrollingModule,
    IccGridRowComponent,
  ],
})
export class IccGridViewportComponent implements AfterViewInit {
  private gridFacade = inject(IccGridFacade);
  private elementRef = inject(ElementRef);
  private _gridConfig!: IccGridConfig;
  @Input() columns: IccColumnConfig[] = [];
  private _gridData: any[] = [];

  @Input()
  set gridConfig(val: IccGridConfig) {
    //console.log(' 8888 gridConfig=', val)
    this._gridConfig = val;
  }
  get gridConfig(): IccGridConfig {
    return this._gridConfig;
  }

  @Input()
  set gridData(data: any[]) { // TODO set local data here
    this._gridData = data;
  }
  get gridData(): any[] {
    // console.log(' view port data uuuu =', this._gridData)
    return this._gridData;
  }

 // @ViewChild(CdkVirtualScrollViewport) private viewport!: CdkVirtualScrollViewport;

  constructor() {
    //console.log(' grid row loaded ')
  }

  ngAfterViewInit(): void {
    interval(1).pipe(take(1)).subscribe(() => {
      const clientHeight = this.elementRef.nativeElement.clientHeight;
      const pageSize = Math.floor(clientHeight / 24) ;
      this.gridFacade.setViewportPageSize(this.gridConfig.gridName, pageSize);
      this.gridFacade.getGridData(this.gridConfig.gridName);
    });
  }

}
