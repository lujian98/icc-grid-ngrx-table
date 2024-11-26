import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IccGridConfig, IccGridComponent, IccColumnConfig, defaultGridConfig } from '@icc/ui/grid';
import { IccFileUploadFacade } from '../../+state/file-upload.facade';

@Component({
  selector: 'icc-file-upload-grid',
  templateUrl: './file-upload-grid.component.html',
  styles: [':host { width: 100%; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IccGridComponent],
})
export class IccFileUploadGridComponent {
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
    },
    {
      name: 'size',
      title: 'ICC.UI.FILE.SIZE',
    },
  ];
}
