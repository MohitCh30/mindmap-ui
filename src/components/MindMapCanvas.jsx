import { useEffect, useRef } from "react";
import * as d3 from "d3";

import data from "../data/mindmap.json";
import { buildHierarchy } from "../utils/buildHierarchy";
import { layoutTree } from "../utils/layoutTree";

export default function MindMapCanvas({
  selectedNode,
  onSelectNode,
  exposeControls,
}) {
  const svgRef = useRef(null);
  const gRef = useRef(null);
  const rootRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const g = d3.select(gRef.current);

    svg.on(".zoom", null);

    const zoom = d3
      .zoom()
      .scaleExtent([0.3, 2.5])
      .on("zoom", (e) => g.attr("transform", e.transform));

    svg.call(zoom);

    const { width, height } = svgRef.current.getBoundingClientRect();

    
    if (!rootRef.current) {
      const root = buildHierarchy(data);

      root.each((d) => {
        if (d.children) {
          d._children = d.children;
          d.children = null;
        }
      });

      rootRef.current = root;
    }

    const root = rootRef.current;

   
    exposeControls?.({
      expandAll: () => {
        root.each((d) => {
          if (d._children) {
            d.children = d._children;
            d._children = null;
          }
        });
        redraw();
      },

      collapseAll: () => {
        root.each((d) => {
          if (d.children) {
            d._children = d.children;
            d.children = null;
          }
        });
        redraw();
      },

      fitView: () => fitToContent(),
    });

    function redraw() {
      g.selectAll("*").remove();
      layoutTree(root);
      drawLinks();
      drawNodes();
    }

    function drawLinks() {
      g.selectAll(".link")
        .data(root.links())
        .join("path")
        .attr("class", "link")
        .attr("fill", "none")
        .attr("stroke", "#475569")
        .attr("stroke-width", 1.5)
        .attr("d", (d) => {
          const mid = (d.source.y + d.target.y) / 2;
          return `M ${d.source.y},${d.source.x}
                  C ${mid},${d.source.x}
                    ${mid},${d.target.x}
                    ${d.target.y},${d.target.x}`;
        });
    }

    function drawNodes() {
      const nodes = g
        .selectAll(".node")
        .data(root.descendants(), (d) => d.data.id)
        .join("g")
        .attr("class", "node")
        .attr("transform", (d) => `translate(${d.y},${d.x})`)
        .style("cursor", "pointer")
        .on("click", (_, d) => {

          if (d.depth === 0) {
            if (!d.children) {
              d.children = d._children;
              d._children = null;
        
              d.children?.forEach(child => {
                if (child.children) {
                  child._children = child.children;
                  child.children = null;
                }
              });
            }
          }
        
          else {
            if (d.children) {
              d._children = d.children;
              d.children = null;
            } else if (d._children) {
              d.children = d._children;
              d._children = null;
            }
          }
        
          onSelectNode(d);
          focusNode(d);
          redraw();
        });
        

      nodes.each(function (d) {
        const text = d.data.title;
        const padding = 32;
        const textWidth = Math.max(180, text.length * 8 + padding);

        d3.select(this)
          .append("rect")
          .attr("x", -textWidth / 2)
          .attr("y", -28)
          .attr("width", textWidth)
          .attr("height", 56)
          .attr("rx", 12)
          .attr("fill",
            selectedNode?.data.id === d.data.id
              ? "#1d4ed8"
              : d.depth === 0
              ? "#0ea5e9"
              : "#1e293b"
          )
          .attr("stroke", "#334155");

        d3.select(this)
          .append("text")
          .attr("text-anchor", "middle")
          .attr("dy", "0.35em")
          .attr("fill", "#e5e7eb")
          .text(text);
      });
    }

    function focusNode(d) {
      svg
        .transition()
        .duration(600)
        .call(
          zoom.transform,
          d3.zoomIdentity.translate(width / 2 - d.y, height / 2 - d.x)
        );
    }

    function fitToContent() {
      const nodes = root.descendants();
      if (!nodes.length) return;

      const xs = nodes.map((n) => n.y);
      const ys = nodes.map((n) => n.x);

      const dx = Math.max(...xs) - Math.min(...xs);
      const dy = Math.max(...ys) - Math.min(...ys);
      const scale = Math.min(width / dx, height / dy) * 0.85;

      svg
        .transition()
        .duration(600)
        .call(
          zoom.transform,
          d3.zoomIdentity
            .translate(width / 2, height / 2)
            .scale(scale)
            .translate(
              -(Math.min(...xs) + dx / 2),
              -(Math.min(...ys) + dy / 2)
            )
        );
    }

    redraw();
  }, [selectedNode, onSelectNode, exposeControls]);

  return (
    <div className="mindmap-canvas">
      <svg ref={svgRef} width="100%" height="100%">
        <g ref={gRef} />
      </svg>
    </div>
  );
}
