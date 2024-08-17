import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IccGridFacade } from './+state/grid.facade';
import { IccGridConfig, IccColumnConfig, defaultGridConfig, IccGridData } from './models/grid-column.model';

@Component({
  selector: 'icc-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IccGridComponent {
  private gridFacade = inject(IccGridFacade);
  private _gridConfig: IccGridConfig = defaultGridConfig;
  isFirstPage$!: Observable<boolean>;
  isLastPage$!: Observable<boolean>;

  @Input()
  set gridConfig(value: IccGridConfig) {
    this._gridConfig = value;
    this.isFirstPage$ = this.gridFacade.isFirstPage(this.gridConfig.gridName);
    this.isLastPage$ = this.gridFacade.isLastPage(this.gridConfig.gridName);
    this.gridFacade.setupGridConfig(value);
  }
  get gridConfig(): IccGridConfig {
    return this._gridConfig;
  }

  @Input() columnConfig: IccColumnConfig[] = [];
  @Input() gridData!: IccGridData<any>;

  refresh(): void {
    this.gridFacade.getGridData(this.gridConfig.gridName);
  }

  getPrevPageData(): void {
    this.gridFacade.getPrevPageData(this.gridConfig.gridName);
  }

  getNextPageData(): void {
    this.gridFacade.getNextPageData(this.gridConfig.gridName);
  }
}
