import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IccColumnConfig } from '@icc/ui/grid';
import { IccTreeComponent, defaultTreeConfig, IccTreeConfig, IccTreeNode } from '@icc/ui/tree';
import { CARSDATA3 } from '../../../data/cars-large';

interface NestedFoodNode {
  name: string;
  test?: string;
  children?: NestedFoodNode[];
}

const NESTED_DATA: NestedFoodNode[] = [
  {
    name: 'Fruit',
    test: 'aaa',
    children: [{ name: 'Apple' }, { name: 'Banana' }, { name: 'Fruit loops' }],
  },
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [{ name: 'Broccoli' }, { name: 'Brussels sprouts' }],
      },
      {
        name: 'Orange',
        children: [{ name: 'Pumpkins' }, { name: 'Carrots' }],
      },
    ],
  },
];

@Component({
  selector: 'app-default-tree-grid',
  template: `<icc-tree [treeConfig]="treeConfig" [columnsConfig]="columnsConfig" [treeData]="treeData"></icc-tree>`,
  styles: [':host { width: 100%; }'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IccTreeComponent],
})
export class AppDefaultTreeGridComponent {
  treeConfig: IccTreeConfig = {
    ...defaultTreeConfig,
    columnSort: true,
    columnFilter: true,
    columnResize: true,
    remoteColumnsConfig: false,
    remoteGridData: false,
  };

  columnsConfig: IccColumnConfig[] = [
    {
      name: 'name',
      width: 50,
      align: 'center',
    },
    /*
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
    },*/
  ];
  treeData: IccTreeNode<NestedFoodNode>[] = NESTED_DATA;
}
