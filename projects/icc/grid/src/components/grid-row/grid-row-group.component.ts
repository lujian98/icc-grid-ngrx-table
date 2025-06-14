import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { IccIconModule } from '@icc/ui/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { IccGridFacade } from '../../+state/grid.facade';
import { IccColumnConfig, IccGridConfig, IccGridSetting } from '../../models/grid-column.model';
import { IccRowGroup } from '../../utils/row-group/row-group';

@Component({
  selector: 'icc-grid-row-group',
  templateUrl: './grid-row-group.component.html',
  styleUrls: ['./grid-row-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.icc-grid-row]': 'iccGridRow',
  },
  imports: [TranslatePipe, IccIconModule],
})
export class IccGridRowGroupComponent<T> {
  private readonly gridFacade = inject(IccGridFacade);
  columns = input.required<IccColumnConfig[]>();
  gridSetting = input.required<IccGridSetting>();
  gridConfig = input.required<IccGridConfig>();
  rowIndex = input.required<number>();
  record = input.required<T | IccRowGroup>();
  onToggleRowGroup = output<IccRowGroup>();
  rowGroup!: IccRowGroup;
  rowGroup$ = computed(() => {
    if (this.record() instanceof IccRowGroup) {
      this.rowGroup = this.record() as IccRowGroup;
      return this.record() as IccRowGroup;
    } else {
      return undefined;
    }
  });

  get title(): string {
    const column = this.columns().find((item) => item.name === this.rowGroup.field)!;
    return column.title || column.name;
  }

  toggleRowGroup(): void {
    this.rowGroup.expanded = !this.rowGroup.expanded;
    this.gridFacade.setToggleRowGroup(this.gridSetting().gridId, this.rowGroup);
    this.onToggleRowGroup.emit(this.rowGroup);
  }

  get iccGridRow(): boolean {
    return true;
  }
}
