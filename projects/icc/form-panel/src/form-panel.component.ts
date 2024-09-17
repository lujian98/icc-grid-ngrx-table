import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  HostListener,
  ViewChild,
  inject,
  Input,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { uniqueId } from '@icc/ui/core';
import { IccFormPanelViewComponent } from './components/form-panel-view.component';
import { IccFormPanelFacade } from './+state/form-panel.facade';
import { IccFormPanelStateModule } from './+state/form-panel-state.module';
import { IccFormPanelConfig } from './models/form-panel.model';
import { defaultFormPanelConfig } from './models/default-form-panel';
@Component({
  selector: 'icc-form-panel',
  templateUrl: './form-panel.component.html',
  styleUrls: ['./form-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IccFormPanelStateModule, IccFormPanelViewComponent],
})
export class IccFormPanelComponent {
  private formPanelFacade = inject(IccFormPanelFacade);

  private _formPanelConfig: IccFormPanelConfig = defaultFormPanelConfig;
  private _formFields: any[] = [];
  /*

  private _gridData!: IccGridData<T>;
  */
  private formPanelId = uniqueId(16);
  formPanelConfig$!: Observable<IccFormPanelConfig>;
  //columnsConfig$!: Observable<IccColumnConfig[]>;

  @Input()
  set formPanelConfig(value: IccFormPanelConfig) {
    this._formPanelConfig = {
      ...value,
      formPanelId: this.formPanelId,
    };
    this.formPanelConfig$ = this.formPanelFacade.selectFormPanelConfig(this.formPanelId);
    //this.columnsConfig$ = this.gridFacade.selectColumnsConfig(this.gridId);
    this.formPanelFacade.initFormPanelConfig(this.formPanelConfig);
  }
  get formPanelConfig(): IccFormPanelConfig {
    return this._formPanelConfig;
  }

  @Input()
  set formFields(val: any[]) {
    this._formFields = val;
    // if (!this.gridConfig.remoteColumnsConfig && this.columnsConfig.length > 0) {
    //   this.gridFacade.setGridColumnsConfig(this.gridConfig, this.columnsConfig);
    // }
  }
  get formFields(): any[] {
    return this._formFields;
  }

  @Input() values: any;
}
