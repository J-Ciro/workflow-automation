import React, { createContext, useState, useContext, useCallback, ReactNode } from 'react';
import { Node, Edge, useReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, OnNodesChange, OnEdgesChange, OnConnect } from '@xyflow/react';
import { getId } from '../constants/flowConstants';
import { NodeType, WorkflowData, NodeData } from '../../../types';

interface FlowContextType {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  handleNodeDrop: (event: React.DragEvent, reactFlowBounds: DOMRect) => void;
  generateFlowJson: () => WorkflowData;
  handleExport: () => void;
}

const FlowContext = createContext<FlowContextType | undefined>(undefined);

interface FlowProviderProps {
  children: ReactNode;
}

export const FlowProvider = ({ children }: FlowProviderProps) => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const { getNodes, getEdges, screenToFlowPosition } = useReactFlow();

  React.useEffect(() => {
    if (nodes.length === 0) {
      setNodes([{
        id: getId(),
        type: 'start',
        position: { x: 250, y: 50 },
        data: {}
      }]);
    }
  }, [nodes.length]);

  const onNodesChange = useCallback<OnNodesChange>(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback<OnEdgesChange>(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect = useCallback<OnConnect>(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
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

  const generateFlowJson = useCallback((): WorkflowData => {
    const currentNodes = getNodes();
    const currentEdges = getEdges();
    const startNode = currentNodes.find(node => node.type === 'start');
    
    if (!startNode) return { start: '', nodes: [] };

    const workflowNodes = currentNodes.map(node => {
      const outgoingEdges = currentEdges.filter(edge => edge.source === node.id);
      
      let next: string | { true?: string; false?: string };
      if (node.type === 'condition') {
        const trueEdge = outgoingEdges.find(edge => edge.sourceHandle === 'true');
        const falseEdge = outgoingEdges.find(edge => edge.sourceHandle === 'false');
        
        next = {
          true: trueEdge?.target,
          false: falseEdge?.target
        };
      } else {
        next = outgoingEdges[0]?.target;
      }

      return {
        id: node.id,
        type: node.type as NodeType,
        data: node.data as NodeData,
        next
      };
    });

    return {
      start: startNode.id,
      nodes: workflowNodes
    };
  }, [getNodes, getEdges]);

  const handleExport = useCallback(() => {
    const flowJson = generateFlowJson();
    console.info('Workflow JSON:', flowJson);
  }, [generateFlowJson]);

  const value: FlowContextType = {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    handleNodeDrop,
    generateFlowJson,
    handleExport
  };

  return <FlowContext.Provider value={value}>{children}</FlowContext.Provider>;
};

export const useFlow = () => {
  const context = useContext(FlowContext);
  if (context === undefined) {
    throw new Error('useFlow must be used within a FlowProvider');
  }
  return context;
};