import { ChangeDetectionStrategy, Component, Input, inject, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IccGridConfig } from '../../models/grid-column.model';
import { IccGridFacade } from '../../+state/grid.facade';

@Component({
  selector: 'icc-grid-footer',
  templateUrl: './grid-footer.component.html',
  styleUrls: ['./grid-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
  ],
})
export class IccGridFooterComponent {
  private gridFacade = inject(IccGridFacade);
  private _gridConfig!: IccGridConfig;


  @Input()
  set gridConfig(val: IccGridConfig) {
    console.log( ' fffffff gridConfig=', val.page)
    this._gridConfig = val;
  }
  get gridConfig(): IccGridConfig {
    return this._gridConfig;
  }

  get page(): number {
    return this.gridConfig.page;
  }

  get lastPage(): number {
    return Math.ceil(this.gridConfig.totalCounts / this.gridConfig.pageSize)-1;
  }


  refresh(): void {
    this.gridFacade.getGridData(this.gridConfig.gridName);
  }

  getGridPageData(page: number): void {
    this.gridFacade.getGridPageData(this.gridConfig.gridName, page);
  }
}
