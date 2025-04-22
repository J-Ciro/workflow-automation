
interface FlowToolbarProps {
  onExport: () => void
}

export const ExportButton = (props: FlowToolbarProps ) => {
  const { onExport } = props;
  return (
    <div className="mb-4">
      <button
        className="bg-indigo-600 hover:bg-indigo-700 hover:cursor-pointer text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2 shadow-sm hover:shadow font-medium"
        onClick={onExport}
      >
        Export to Console
      </button>
    </div>
  )
}
