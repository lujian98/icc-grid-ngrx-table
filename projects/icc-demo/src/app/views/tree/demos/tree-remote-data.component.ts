import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IccColumnConfig } from '@icc/ui/grid';
import { IccTreeComponent, defaultTreeConfig, IccTreeConfig } from '@icc/ui/tree';

@Component({
  selector: 'app-tree-remote-data',
  template: `<icc-tree [treeConfig]="treeConfig" [columnsConfig]="columnsConfig"></icc-tree>`,
  styles: [':host {  display: flex; width: 100%; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IccTreeComponent],
})
export class AppTreeRemoteDataComponent {
  treeConfig: IccTreeConfig = {
    ...defaultTreeConfig,
    urlKey: 'ECR',
    remoteGridData: true,
    remoteLoadAll: true,

    columnSort: true,
    columnFilter: true,
    columnResize: true,
  };

  columnsConfig: IccColumnConfig[] = [
    {
      name: 'name',
      width: 50,
      align: 'left',
    },
    {
      name: 'vin',
    },
    {
      name: 'brand',
    },
    {
      name: 'year',
      width: 50,
      align: 'right',
    },
    {
      name: 'color',
      width: 80,
      align: 'center',
    },
  ];
}
