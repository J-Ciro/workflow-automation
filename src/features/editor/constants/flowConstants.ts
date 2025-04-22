import { NodeTypes, MarkerType } from '@xyflow/react';
import { EmailNode } from '../../nodes/components/EmailNode';
import { WaitNode } from '../../nodes/components/WaitNode';
import { ConditionNode } from '../../nodes/components/ConditionNode';
import { StartNode } from '../../nodes/components/StartNode';

export const nodeTypes = {
  start: StartNode,
  email: EmailNode,
  wait: WaitNode,
  condition: ConditionNode,
} as NodeTypes;

export const defaultEdgeOptions = {
  style: { strokeWidth: 2, stroke: '#b1b1b7' },
  type: 'smoothstep',
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: '#b1b1b7',
  },
};

let idCounter = 0;
export const getId = () => `node_${idCounter++}`;