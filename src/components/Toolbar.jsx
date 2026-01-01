export default function Toolbar({ controls }) {
  if (!controls) return null;

  return (
    <div style={{ position: "absolute", top: 16, left: 16, display: "flex", gap: 8 }}>
      <button className="toolbar-btn" onClick={controls.expandAll}>
        Expand All
      </button>
      <button className="toolbar-btn" onClick={controls.collapseAll}>
        Collapse All
      </button>
      <button className="toolbar-btn" onClick={controls.fitView}>
        Fit View
      </button>
    </div>
  );
}
