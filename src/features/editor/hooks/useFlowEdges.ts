import { useState, useCallback } from 'react';
import { Edge, OnEdgesChange, OnConnect, applyEdgeChanges, addEdge } from '@xyflow/react';

export const useFlowEdges = () => {
  const [edges, setEdges] = useState<Edge[]>([]);
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const onConnect: OnConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    []
  );

  return {
    edges,
    setEdges,
    onEdgesChange,
    onConnect
  };
};
