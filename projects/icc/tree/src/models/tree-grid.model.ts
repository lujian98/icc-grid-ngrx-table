import { IccGridConfig, defaultGridConfig } from '@icc/ui/grid';

export interface IccTreeConfig extends IccGridConfig {}

export const defaultTreeConfig: IccTreeConfig = {
  ...defaultGridConfig,
  isTreeGrid: true,
  virtualScroll: true,
  pageSize: 10000,
};

export interface IccTreeData {
  //id?: string;
  name: string;
  level?: number;
  leaf?: boolean;
  expanded?: boolean;
  //icon?: string | SunIconConfig;
  //readonly?: boolean;
  //
  children?: IccTreeData[];
  //contextMenu?: SunMenuItem[];
}

export interface IccTreeNode<T> extends IccTreeData {}

export interface TreeState {
  [key: string]: IccTreeState;
}

export interface IccTreeState<T extends object = object> {
  treeConfig: IccTreeConfig;
  treeData: IccTreeNode<T>[];
  remoteData: IccTreeNode<T>[];
  inMemoryData: IccTreeNode<T>[];
}

export const defaultTreeState: IccTreeState = {
  treeConfig: defaultTreeConfig,
  treeData: [],
  remoteData: [],
  inMemoryData: [],
};

export function iccFlattenTree<T>(nodes: IccTreeNode<T>[], level: number): IccTreeNode<T>[] {
  const flattenedNodes: IccTreeNode<T>[] = [];
  for (const node of nodes) {
    const leaf = node.children ? false : true;
    flattenedNodes.push({ ...node, level, leaf });
    if (node.children) {
      flattenedNodes.push(...iccFlattenTree(node.children, level + 1));
    }
  }
  return flattenedNodes;
}
