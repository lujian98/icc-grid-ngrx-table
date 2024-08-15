import { ChangeDetectionStrategy, Component, Input, inject, AfterViewInit, EventEmitter, ViewChild } from '@angular/core';
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
  private _gridConfig!: IccGridConfig;
  @Input() columns: IccColumnConfig[] = [];
  @Input() gridData: any[] = [];

  @Input()
  set gridConfig(val: IccGridConfig) {
    console.log(' 8888 gridConfig=', val)
    this._gridConfig = val;
  }
  get gridConfig(): IccGridConfig {
    return this._gridConfig;
  }

  @ViewChild(CdkVirtualScrollViewport) private viewport!: CdkVirtualScrollViewport;

  constructor() {
    console.log(' grid row loaded ')
  }

  ngAfterViewInit(): void {
    const viewportSize = this.viewport.elementRef.nativeElement.getBoundingClientRect();
    console.log(' 99999 viewportSize=', viewportSize, 'this.gridConfig.gridName=', this.gridConfig.gridName)
     this.gridFacade.setViewportPageSize(this.gridConfig.gridName, 35);
    // console.log(' viewportSize=', viewportSize)
    // TODO set remote data here only
    const pageSize = Math.floor(viewportSize.height / 25) - 1;
    console.log(' 99999 pageSize=', pageSize)

    this.gridFacade.getGridData(this.gridConfig.gridName);
    /*
        interval(1)
        .pipe(take(1))
        .subscribe(() => {
          this.gridFacade.getGridData(this.gridConfig.gridName);

        });*/
  }

}
