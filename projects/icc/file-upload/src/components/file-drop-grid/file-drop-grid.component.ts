import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IccGridConfig, IccGridComponent, IccColumnConfig, defaultGridConfig } from '@icc/ui/grid';
import { IccFileUploadFacade } from '../../+state/file-upload.facade';

@Component({
  selector: 'icc-file-drop-grid',
  templateUrl: './file-drop-grid.component.html',
  styles: [':host { width: 100%; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IccGridComponent],
})
export class IccFileDropGridComponent {
  private fileUploadFacade = inject(IccFileUploadFacade);
  gridData$ = this.fileUploadFacade.selectUploadFilesGridData$;

  gridConfig: IccGridConfig = {
    ...defaultGridConfig,
    verticalScroll: true,
    columnSort: true,
    sortFields: [
      {
        field: 'fieldName',
        dir: 'asc',
      },
    ],
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
}
