import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IccColumnConfig, IccGridComponent, IccGridConfig, defaultGridConfig } from '@icc/ui/grid';
import { IccFileUploadFacade } from '../../+state/file-upload.facade';

@Component({
  selector: 'icc-file-upload-grid',
  templateUrl: './file-upload-grid.component.html',
  styles: [':host { width: 100%; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IccGridComponent],
})
export class IccFileUploadGridComponent {
  private readonly fileUploadFacade = inject(IccFileUploadFacade);
  gridData$ = this.fileUploadFacade.getUploadFilesGridData$;

  gridConfig: IccGridConfig = {
    ...defaultGridConfig,
    verticalScroll: true,
    columnSort: true,
    columnResize: true,
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
      title: 'ICC.UI.FIELDS.FIELD_NAME',
      width: 50,
      align: 'center',
    },
    {
      name: 'filename',
      title: 'ICC.UI.FILE.NAME',
    },
    {
      name: 'type',
      title: 'ICC.UI.FILE.TYPE',
      width: 50,
      align: 'center',
    },
    {
      name: 'size',
      title: 'ICC.UI.FILE.SIZE',
      width: 50,
      align: 'center',
    },
  ];
}
