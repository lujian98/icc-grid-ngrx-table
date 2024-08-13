import { ChangeDetectionStrategy, Component, Input, inject, AfterViewInit, EventEmitter, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { DataSource } from '@angular/cdk/collections';
import { CdkTableModule } from '@angular/cdk/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { IccGridFacade } from '../../+state/grid.facade';
import { IccGridRowComponent } from '../grid-row/grid-row.component';
import { IccGridConfig, IccColumnConfig } from '../../models/grid-column.model';

@Component({
  selector: 'icc-grid-viewport',
  templateUrl: './grid-viewport.component.html',
  styleUrls: ['./grid-viewport.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    console.log( ' 8888 gridConfig=', val)
    this._gridConfig = val;
  }
  get gridConfig(): IccGridConfig {
    return this._gridConfig;
  }

   @ViewChild(CdkVirtualScrollViewport) private viewport!: CdkVirtualScrollViewport;

  constructor() {
    console.log( ' grid row loaded ')
  }

  ngAfterViewInit(): void {
    const viewportSize = this.viewport.elementRef.nativeElement.getBoundingClientRect();
    console.log(' 99999 viewportSize=', viewportSize)
   // console.log(' viewportSize=', viewportSize)
    // TODO set remote data here only
    this.gridFacade.getGridData(this.gridConfig.gridName);
  }

}
