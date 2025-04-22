import { ReactFlowProvider } from '@xyflow/react';
import { Canvas } from './components/Canvas';
import { NodesSidebar } from './components/NodesSidebar';
import { FlowProvider } from './context/FlowContext';
import { JsonViewerPanel } from './components/JsonViewerPanel';


const FlowEditorContent = () => {
  return (
    <div className="flex h-screen">
      <NodesSidebar />
      <Canvas />
      <JsonViewerPanel />
    </div>
  );
};

const FlowEditor = () => {
  return (
    <ReactFlowProvider>
      <FlowProvider>
        <FlowEditorContent />
      </FlowProvider>
    </ReactFlowProvider>
  );
};

export default FlowEditor;