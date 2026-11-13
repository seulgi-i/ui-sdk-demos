import categoryTree from "@/data/categories.json";

export type CategoryNode = {
  id: string;
  name: string;
  parentId: string | null;
  depth: 1 | 2 | 3;
  children: CategoryNode[];
};

export type CategoryOption = {
  id: string;
  name: string;
  depth: 1 | 2 | 3;
  path: string;
  parentId: string | null;
  isLeaf: boolean;
};

function walk(
  nodes: CategoryNode[],
  ancestors: string[],
  out: CategoryOption[],
): void {
  for (const node of nodes) {
    const pathParts = [...ancestors, node.name];
    out.push({
      id: node.id,
      name: node.name,
      depth: node.depth,
      path: pathParts.join(" > "),
      parentId: node.parentId,
      isLeaf: node.children.length === 0,
    });
    if (node.children.length > 0) {
      walk(node.children as CategoryNode[], pathParts, out);
    }
  }
}

export const CATEGORY_TREE = categoryTree as CategoryNode[];

export const CATEGORY_OPTIONS: CategoryOption[] = (() => {
  const options: CategoryOption[] = [];
  walk(CATEGORY_TREE, [], options);
  return options;
})();

export function countNodes(nodes: CategoryNode[]): number {
  return nodes.reduce(
    (sum, node) => sum + 1 + countNodes(node.children as CategoryNode[]),
    0,
  );
}
