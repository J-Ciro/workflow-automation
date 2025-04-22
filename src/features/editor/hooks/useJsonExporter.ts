import { useCallback } from 'react';
import { useReactFlow } from '@xyflow/react';
import { WorkflowData, NodeType, NodeData } from '../../../types';

export const useJsonExporter = () => {
  const { getNodes, getEdges } = useReactFlow();

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

  return {
    generateFlowJson,
    handleExport
  };
};