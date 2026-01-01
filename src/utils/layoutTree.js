import { tree } from "d3-hierarchy";

export function layoutTree(root) {
  const layout = tree().nodeSize([120, 220]);
  return layout(root);
}
