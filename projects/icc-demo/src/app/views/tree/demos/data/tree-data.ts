import { IccTreeNode } from '@icc/ui/tree';

export interface NestedFoodNode extends IccTreeNode<NestedFoodNode> {
  name: string;
  vin?: string;
  year?: string;
  children?: NestedFoodNode[];
}

export const TREE_NESTED_DATA: NestedFoodNode[] = [
  {
    name: 'Fruit',
    vin: 'aaa',
    expanded: false,
    children: [{ name: 'Apple' }, { name: 'Banana' }, { name: 'Fruit loops' }],
  },
  {
    name: 'Vegetables',
    expanded: true,
    children: [
      {
        name: 'Green',
        expanded: true,
        children: [{ name: 'Broccoli' }, { name: 'Brussels sprouts' }],
      },
      {
        name: 'Orange',
        year: '1990',
        expanded: false,
        children: [{ name: 'Pumpkins' }, { name: 'Carrots' }],
      },
    ],
  },
];
