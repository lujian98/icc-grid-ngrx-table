import { IccTreeNode } from '../models/tree-grid.model';

export function iccFlattenTree<T>(nodes: IccTreeNode<T>[], level: number): IccTreeNode<T>[] {
  const flattenedNodes: IccTreeNode<T>[] = [];
  for (const node of nodes) {
    const leaf = node.children ? false : true; // TODO remote node leaf???
    flattenedNodes.push({ ...node, level, leaf });
    if (node.children && node.expanded) {
      flattenedNodes.push(...iccFlattenTree(node.children, level + 1));
    }
  }
  return flattenedNodes;
}

export function iccNodeToggleInMemoryData<T>(nodes: IccTreeNode<T>[], n: IccTreeNode<T>): IccTreeNode<T>[] {
  return [...nodes].map((node) => {
    return {
      ...node,
      expanded: node.name === n.name ? !node.expanded : node.expanded,
      children: node.children ? iccNodeToggleInMemoryData(node.children, n) : undefined,
    };
  });
}

export function iccExpandAllNodesInMemoryData<T>(nodes: IccTreeNode<T>[], expanded: boolean): IccTreeNode<T>[] {
  return [...nodes].map((node) => {
    return {
      ...node,
      expanded: node.children ? expanded : undefined,
      children: node.children ? iccExpandAllNodesInMemoryData(node.children, expanded) : undefined,
    };
  });
}

export function iccSetNestNodeId<T>(nodes: IccTreeNode<T>[]): IccTreeNode<T>[] {
  return [...nodes].map((node) => {
    return {
      ...node,
      id: node.id ? node.id : node.name,
      children: node.children ? iccSetNestNodeId(node.children) : undefined,
    };
  });
}

export function iccFindNodeId<T>(id: string, nodes: IccTreeNode<T>[]): IccTreeNode<T> | null {
  let find: IccTreeNode<T> | null = null;
  [...nodes].forEach((node) => {
    if (node.id === id) {
      find = node;
    } else if (node.children && !find) {
      find = iccFindNodeId(id, node.children);
    }
  });
  return find;
}

export function iccGetNodeParent<T>(n: IccTreeNode<T>, nodes: IccTreeNode<T>[]): IccTreeNode<T> | undefined {
  return [...nodes].find((node) => node.children?.find((cn: IccTreeNode<T>) => cn.id === n.id));
}
