import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IccGridConfig, IccGridComponent, IccColumnConfig, defaultGridConfig, IccGridData } from '@icc/ui/grid';
import { IccFileDropFacade } from '../../+state/file-drop.facade';

//import { CARSDATA3 } from '../../../data/cars-large';

@Component({
  selector: 'icc-file-drop-grid',
  templateUrl: './file-drop-grid.component.html',
  styles: [':host { width: 100%; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IccGridComponent],
})
export class IccFileDropGridComponent {
  private fileDropFacade = inject(IccFileDropFacade);
  gridData$ = this.fileDropFacade.selectUploadFilesGridData$;

  gridConfig: IccGridConfig = {
    ...defaultGridConfig,
    verticalScroll: true,
    pageSize: 1000,
    hideTopbar: true,
    hideGridFooter: true,
    remoteColumnsConfig: false,
    remoteGridData: false,
  };
  columnsConfig: IccColumnConfig[] = [
    {
      name: 'fieldName',
      width: 50,
      align: 'center',
    },
    {
      name: 'filename',
    },
    {
      name: 'type',
    },
    {
      name: 'size',
    },
  ];
  //gridData: IccGridData<any> =  CARSDATA3; //  [gridData]="gridData"
}
