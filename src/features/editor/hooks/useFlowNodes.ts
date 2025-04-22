import { useState, useCallback, useEffect } from 'react';
import { Node, applyNodeChanges, OnNodesChange, useReactFlow } from '@xyflow/react';
import { getId } from '../constants/flowConstants';
import { NodeType } from '../../../types';

export const useFlowNodes = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const { screenToFlowPosition } = useReactFlow();

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const handleNodeDrop = useCallback(
    (event: React.DragEvent, reactFlowBounds: DOMRect) => {
      const type = event.dataTransfer.getData('application/reactflow') as NodeType;
      const nodeDataStr = event.dataTransfer.getData('application/nodeData');
      const nodeData = nodeDataStr ? JSON.parse(nodeDataStr) : {};

      if (!type) return;

      if (type === 'start' && nodes.some(node => node.type === 'start')) {
        alert('Only one Start node is allowed');
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode: Node = {
        id: getId(),
        type,
        position,
        data: { ...nodeData, label: type },
      };
      
      setNodes((nds) => nds.concat(newNode));
    },
    [nodes, screenToFlowPosition]
  );

  useEffect(() => {
    if (nodes.length === 0) {
      setNodes([{
        id: getId(),
        type: 'start',
        position: { x: 250, y: 50 },
        data: {}
      }]);
    }
  }, [nodes.length]);

  return {
    nodes,
    setNodes,
    onNodesChange,
    handleNodeDrop
  };
};
