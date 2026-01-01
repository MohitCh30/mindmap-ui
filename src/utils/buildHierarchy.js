import { hierarchy } from "d3-hierarchy";

export function buildHierarchy(data) {
  return hierarchy(data, (d) => d.children);
}
