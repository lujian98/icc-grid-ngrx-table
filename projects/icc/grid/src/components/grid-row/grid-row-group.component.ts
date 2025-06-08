import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  EventEmitter,
  signal,
  Input,
  input,
  Output,
  inject,
} from '@angular/core';
import { IccIconModule } from '@icc/ui/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { IccColumnConfig, IccGridConfig, IccGridSetting } from '../../models/grid-column.model';
import { IccRowGroup } from '../../utils/row-group/row-group';
import { IccGridFacade } from '../../+state/grid.facade';

@Component({
  selector: 'icc-grid-row-group',
  templateUrl: './grid-row-group.component.html',
  styleUrls: ['./grid-row-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.icc-grid-row]': 'iccGridRow',
  },
  imports: [CommonModule, TranslatePipe, IccIconModule],
})
export class IccGridRowGroupComponent<T> {
  private readonly gridFacade = inject(IccGridFacade);
  private _record!: IccRowGroup;
  //record$ = signal<IccRowGroup | undefined>(undefined);

  columns = input.required<IccColumnConfig[]>();
  gridSetting = input.required<IccGridSetting>();
  gridConfig = input.required<IccGridConfig>();
  rowIndex = input.required<number>();
  //record = input.required<IccRowGroup>();

  //@Input() gridSetting!: IccGridSetting;
  //@Input() gridConfig!: IccGridConfig;
  //@Input() columns: IccColumnConfig[] = [];
  //@Input() rowIndex!: number;

  @Input()
  set record(data: T | IccRowGroup) {
    if (data instanceof IccRowGroup) {
      this._record = data;
    }
  }
  get record(): IccRowGroup {
    return this._record;
  }

  get title(): string {
    const column = this.columns().find((item) => item.name === this.record.field)!;
    return column.title || column.name;
  }

  @Output() onToggleRowGroup = new EventEmitter<IccRowGroup>();

  constructor() {
    /*
      effect(() => {
        if (this.record()) {
          this.record$.update(()=> {
            if (this.record() instanceof IccRowGroup) {
              return this.record();
            } else {
              return undefined;
            }
          })
        }
      });*/
  }

  toggleRowGroup(): void {
    this.record.expanded = !this.record.expanded;
    /*
      this.record$.update((record)=> {
        if (record instanceof IccRowGroup && record !== undefined) {
          return {...record};
        } else {
          return undefined;
        }
      });
      */

    this.gridFacade.setToggleRowGroup(this.gridSetting().gridId, this.record);
    this.onToggleRowGroup.emit(this.record);
  }

  get iccGridRow() {
    return true;
  }
}
