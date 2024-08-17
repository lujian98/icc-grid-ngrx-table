import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
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
  private _page: number = 1;

  @Input()
  set gridConfig(val: IccGridConfig) {
    this._gridConfig = val;
    this.page = val.page;
  }
  get gridConfig(): IccGridConfig {
    return this._gridConfig;
  }

  set page(val: number) {
    this._page = val;
  }
  get page(): number {
    return this._page;
  }

  get lastPage(): number {
    return Math.ceil(this.gridConfig.totalCounts / this.gridConfig.pageSize) - 0;
  }

  get displaying(): string {
    const start = (this.gridConfig.page - 1) * this.gridConfig.pageSize + 1;
    let end = start + this.gridConfig.pageSize - 1;
    if(end > this.gridConfig.totalCounts) {
      end = this.gridConfig.totalCounts;
    }
    return `Displaying ${start} - ${end} of ${this.gridConfig.totalCounts}`;
  }

  getGridPageData(page: number): void {
    this.gridFacade.getGridPageData(this.gridConfig.gridName, page);
  }

  valueChanged(event: any): void {
    let page: number = event.target.value | 1;
    if (page < 1) {
      page = 1;
    } else if (page > this.lastPage) {
      page = this.lastPage;
    }
    interval(500)
      .pipe(
        take(1),
      )
      .subscribe(() => this.getGridPageData(this.page));
  }
}
