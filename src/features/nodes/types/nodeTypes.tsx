import { Clock, GitBranch, Mail, Play } from "lucide-react";
import type { NodeType } from "../../../types";
import { JSX } from "react";
export interface NodeTypeInfo {
  type: NodeType;
  label: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  icon: JSX.Element;
  defaultData: {
    title?: string;
    content?: string;
    hours?: number;
    condition?: string;
  };
}

export const nodeTypes: NodeTypeInfo[] = [
  {
    type: "start",
    label: "Start",
    bgColor: "bg-teal-50",
    textColor: "text-teal-800",
    borderColor: "border-teal-200",
    icon: <Play className="h-4 w-4 text-teal-500" />,
    defaultData: {},
  },
  {
    type: "email",
    label: "Email",
    bgColor: "bg-rose-50",
    textColor: "text-rose-900",
    borderColor: "border-rose-200",
    icon: <Mail className="h-4 w-4 text-rose-500" />,
    defaultData: { title: "New Email", content: "Email content here..." },
  },
  {
    type: "wait",
    label: "Wait",
    bgColor: "bg-slate-700",
    textColor: "text-slate-50",
    borderColor: "border-slate-600",
    icon: <Clock className="h-4 w-4 text-slate-300" />,
    defaultData: { hours: 24 },
  },
  {
    type: "condition",
    label: "Condition",
    bgColor: "bg-indigo-50",
    textColor: "text-indigo-900",
    borderColor: "border-indigo-200",
    icon: <GitBranch className="h-4 w-4 text-indigo-500" />,
    defaultData: { condition: 'user.status === "active"' },
  },
];