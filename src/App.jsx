import { useState } from "react";
import MindMapCanvas from "./components/MindMapCanvas";
import SidePanel from "./components/SidePanel";
import Toolbar from "./components/Toolbar";

export default function App() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [controls, setControls] = useState(null);

  return (
    <div className="app-container">
      <Toolbar controls={controls} />
      <MindMapCanvas
        selectedNode={selectedNode}
        onSelectNode={setSelectedNode}
        exposeControls={setControls}
      />
      <SidePanel selectedNode={selectedNode} />
    </div>
  );
}
