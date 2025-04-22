import type { NodeProps } from "@xyflow/react"
import { Handle, Position } from "@xyflow/react"
import { EditableNumber } from "../../../components/EditableNumber"
import type { WaitData } from "../../../types"

export const WaitNode = ({ id, data, selected }: NodeProps) => {
  const waitData = data as WaitData
  return (
    <div
      className={`rounded-xl bg-slate-600 text-slate-50 border-1 border-zinc-800 p-3 min-w-[140px] text-center shadow-md transition-all duration-200 hover:shadow-lg ${selected ? "ring-2 ring-slate-400" : "border border-slate-600"}`}
    >
      <div className="flex items-center justify-center gap-1 font-medium" id={id}>
        <span className="text-slate-300">Wait:</span>
        <EditableNumber
          value={waitData.hours || 24}
          onUpdate={(value) => (waitData.hours = value)}
          className="bg-slate-500 text-white mx-1 text-center px-2 py-1 rounded w-16 focus:outline-none focus:ring-1 focus:ring-slate-400"
          min={0}
        />
        <span className="text-slate-300">hours</span>
      </div>
      <Handle type="target" position={Position.Top} id="in" className="w-3 h-3 bg-slate-400 border-2 border-white" />
      <Handle
        type="source"
        position={Position.Bottom}
        id="out"
        className="w-3 h-3 bg-slate-400 border-2 border-white"
      />
    </div>
  )
}
