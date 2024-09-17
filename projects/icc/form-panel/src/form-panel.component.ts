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

import { IccFormPanelViewComponent } from './components/form-panel-view.component';
import { IccFormPanelFacade } from './+state/form-panel.facade';
import { IccFormPanelStateModule } from './+state/form-panel-state.module';

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

  formFields = [
    {
      fieldType: 'text',
      fieldName: 'userName',
      fieldLabel: 'User Name',
    },
    {
      fieldType: 'text',
      fieldName: 'loginName',
      fieldLabel: 'Login Name',
    },
  ];

  values = {
    userName: 'user 77 2222',
    loginName: 'test login88',
  };
}
