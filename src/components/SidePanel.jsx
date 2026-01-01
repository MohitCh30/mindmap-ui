export default function SidePanel({ selectedNode }) {
  return (
    <div className="side-panel">
      <h3>Node Details</h3>

      {!selectedNode ? (
        <p>Select a node</p>
      ) : (
        <>
          <h4>{selectedNode.data.title}</h4>
          <p style={{ fontSize: "14px", lineHeight: 1.5 }}>
            {selectedNode.data.summary}
          </p>
        </>
      )}
    </div>
  );
}
