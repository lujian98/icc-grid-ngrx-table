import { IccTreeNode } from '../models/tree-grid.model';

export function iccFlattenTree<T>(nodes: IccTreeNode<T>[], level: number): IccTreeNode<T>[] {
  const flattenedNodes: IccTreeNode<T>[] = [];
  for (const node of nodes) {
    const leaf = node.children ? false : true;
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
