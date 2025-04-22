export type NodeType = 'start' | 'email' | 'wait' | 'condition';

export interface NodeData {
  label?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface EmailData extends NodeData {
  title?: string;
  content?: string;
}

export interface WaitData extends NodeData {
  hours: number;
}

export interface ConditionData extends NodeData {
  condition: string;
}

export interface WorkflowNode {
  id: string;
  type: NodeType;
  data: NodeData;
  next?: string | { true?: string; false?: string };
}

export interface WorkflowData {
  start?: string;
  nodes: WorkflowNode[];
}
