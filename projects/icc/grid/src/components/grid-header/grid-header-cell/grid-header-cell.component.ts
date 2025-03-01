import { CdkMenuTrigger } from '@angular/cdk/menu';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { IccIconModule } from '@icc/ui/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { IccGridFacade } from '../../../+state/grid.facade';
import { IccColumnConfig, IccGridConfig, IccGridSetting, IccSortField } from '../../../models/grid-column.model';
import { IccGridColumnMenuComponent } from '../grid-column-menu/grid-column-menu.component';

@Component({
  selector: 'icc-grid-header-cell',
  templateUrl: './grid-header-cell.component.html',
  styleUrls: ['./grid-header-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TranslatePipe, IccIconModule, IccGridColumnMenuComponent, CdkMenuTrigger],
  providers: [IccGridFacade],
})
export class IccGridHeaderCellComponent {
  private gridFacade = inject(IccGridFacade);
  @Input() column!: IccColumnConfig;
  @Input() gridSetting!: IccGridSetting;
  @Input() gridConfig!: IccGridConfig;
  @Input() values: { [key: string]: boolean } = {};

  get title(): string {
    return this.column.title === undefined ? this.column.name : this.column.title;
  }

  get findSortField(): IccSortField | undefined {
    return this.gridConfig.sortFields.find((field) => field.field === this.column.name);
  }

  get isSortField(): boolean {
    return this.column.sortField !== false && !!this.findSortField;
  }

  get sortDir(): string {
    return this.findSortField!.dir;
  }

  headCellClick(event: MouseEvent): void {
    if (this.gridConfig.columnSort && this.column.sortField !== false) {
      let find = this.findSortField;
      let sort: IccSortField;
      if (find) {
        sort = { ...find };
        sort.dir = sort.dir === 'asc' ? 'desc' : 'asc';
      } else {
        sort = {
          field: this.column.name,
          dir: 'asc',
        };
      }
      this.gridFacade.setGridSortFields(this.gridConfig, this.gridSetting, [sort]);
    }
  }
}
