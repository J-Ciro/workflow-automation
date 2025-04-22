import { Handle, type NodeProps, Position } from "@xyflow/react"
import type { ConditionData } from "../../../types"
import { EditableText } from "../../../components/EditableText"


export const ConditionNode = ({ id, data, selected }: NodeProps) => {
  const conditionData = data as ConditionData
  return (
    <div
      className={`rounded-xl bg-indigo-50 text-indigo-900 p-3 min-w-[180px] shadow-md transition-all duration-200 hover:shadow-lg relative ${selected ? "ring-2 ring-indigo-300" : "border border-indigo-200"}`}
    >
      <div className="font-medium mb-2 flex items-center gap-2">
        <span>Condition</span>
      </div>
      <div className="text-sm mt-1" id={id?.toString()}>
        <EditableText
          value={conditionData?.condition || '==='}
          onUpdate={(value) => {
            if (conditionData) conditionData.condition = value
          }}
          className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded w-full min-h-[40px] focus:outline-none focus:ring-1 focus:ring-indigo-400"
          multiline
        />
      </div>
      <Handle type="target" position={Position.Top} id="in" className="w-3 h-3 bg-indigo-400 border-2 border-white" />
      <Handle
        type="source"
        position={Position.Left}
        id="true"
        className="w-3 h-3 bg-emerald-400 border-2 border-white"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="false"
        style={{ top: "50%" }}
        className="w-3 h-3 bg-rose-400 border-2 border-white"
      />
      <div className="absolute top-1/2 -left-12 transform -translate-y-1/2 text-xs font-medium bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
        True
      </div>
      <div className="absolute top-1/2 -right-12 transform -translate-y-1/2 text-xs font-medium bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full">
        False
      </div>
    </div>
  )
}
