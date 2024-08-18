import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IccGridFacade } from '../../../+state/grid.facade';
import { IccColumnConfig, IccGridConfig } from '../../../models/grid-column.model';

@Component({
  selector: 'sun-grid-column-menu',
  templateUrl: './grid-column-menu.component.html',
  styleUrls: ['./grid-column-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
  ],
})
export class IccGridColumnMenuComponent {
  private gridFacade = inject(IccGridFacade);
  columnConfig$!: Observable<IccColumnConfig[]>;
  private _gridConfig!: IccGridConfig;

  @Input()
  set gridConfig(val: IccGridConfig) {
    this._gridConfig = val;
    this.columnConfig$ = this.gridFacade.selectColumnConfig(val.gridName);
  }
  get gridConfig(): IccGridConfig {
    return this._gridConfig;
  }
  @Input() column!: IccColumnConfig;

  getTitle(column: IccColumnConfig): string {
    return column.title === undefined ? column.name : column.title;
  }
}
