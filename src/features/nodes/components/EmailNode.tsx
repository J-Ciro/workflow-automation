import type { EmailData } from "../../../types"
import { EditableText } from "../../../components/EditableText"
import { Handle, type NodeProps, Position } from "@xyflow/react"

export const EmailNode = ({ id, data, selected }: NodeProps) => {
  const emailData = data as EmailData
  return (
    <div
      className={`rounded-xl bg-rose-50 text-rose-900 p-3 min-w-[180px] shadow-md transition-all duration-200 hover:shadow-lg ${selected ? "ring-2 ring-rose-300" : "border border-rose-200"}`}
    >
      <div className="font-medium mb-2 flex items-center gap-2" id={id?.toString()}>
       
        <EditableText
          value={emailData.title || "New Email"}
          onUpdate={(value) => (emailData.title = value)}
          className="bg-rose-100 text-rose-800 px-2 py-1 rounded w-full focus:outline-none focus:ring-1 focus:ring-rose-400"
        />
      </div>
      <div className="text-sm">
        <EditableText
          value={emailData.content || "Email content here..."}
          onUpdate={(value) => (emailData.content = value)}
          className="bg-rose-100 text-rose-800 px-2 py-1 rounded w-full min-h-[60px] focus:outline-none focus:ring-1 max-w-[250px] word-break break-all focus:ring-rose-400"
          multiline
        />
      </div>
      <Handle type="target" position={Position.Top} id="in" className="w-3 h-3 bg-rose-400 border-2 border-white" />
      <Handle type="source" position={Position.Bottom} id="out" className="w-3 h-3 bg-rose-400 border-2 border-white" />
    </div>
  )
}
