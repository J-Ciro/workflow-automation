import React from "react";
import { SquareMousePointer, Layers } from "lucide-react";
import type { NodeType } from "../../../types";
import { NodeTypeInfo, nodeTypes } from "../types/nodeTypes.tsx";

export const NodesList = () => {
  const onDragStart = (event: React.DragEvent, nodeType: NodeType, data: NodeTypeInfo["defaultData"]) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.setData("application/nodeData", JSON.stringify(data));
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <SquareMousePointer className="h-5 w-5 text-slate-700" />
        <h3 className="text-lg font-medium">Nodes</h3>
      </div>

      <div className="bg-slate-50 rounded-xl border border-slate-200 shadow-sm overflow-hidden h-[90%]">
        <div className="border-b border-slate-200 bg-slate-100 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-indigo-500" />
            <span className="font-medium text-slate-700 text-sm">Node Types</span>
          </div>
          <span className="text-xs text-slate-500">{nodeTypes.length} available</span>
        </div>

        <div className="p-3 space-y-2">
          {nodeTypes.map((node) => (
            <div
              key={node.type}
              className={`${node.bgColor} ${node.textColor} rounded-lg p-3 cursor-grab transition-all duration-200 border ${node.borderColor} flex items-center gap-2 hover:shadow-md`}
              onDragStart={(e) => onDragStart(e, node.type, node.defaultData)}
              draggable
            >
              {node.icon}
              <span className="font-medium">{node.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 text-sm text-slate-500 flex items-center gap-2">
        <span>Drag and drop nodes to the canvas</span>
      </div>
    </div>
  );
};