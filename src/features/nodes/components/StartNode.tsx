import { Handle, type NodeProps, Position } from "@xyflow/react"

export const StartNode = ({ id }: NodeProps) => (
  <div className="rounded-xl bg-teal-50 text-teal-800 p-3 shadow-md min-w-[120px] text-center border border-teal-200 transition-all duration-200 hover:shadow-lg">
    <div className="font-medium text-base" id={id}>
      Start
    </div>
    <Handle type="source" position={Position.Bottom} id="out" className="w-3 h-3 bg-teal-400 border-2 border-white" />
  </div>
)
