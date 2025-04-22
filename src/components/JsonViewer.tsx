import { WorkflowData } from '../types';

interface JsonViewerProps {
  data: WorkflowData;
}

export const JsonViewer  = (props: JsonViewerProps) => {
  const { data } = props;
  return (
<div className="rounded-lg overflow-hidden border w-90 border-slate-200 shadow-sm" >
<div className="bg-gray-100 p-2 flex items-center justify-between border-b border-slate-200">
  <div className="flex items-center gap-2">
    <span className="font-medium text-slate-700 text-sm">Workflow JSON</span>
  </div>
</div>
<pre className="bg-slate-50 text-slate-800 p-4 overflow-auto h-[calc(50vh-150px)] w-full text-xs font-mono no-scrollbar">
{JSON.stringify(data, null, 2)}
</pre>
</div>
  );
};