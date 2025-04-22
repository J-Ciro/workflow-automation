import { JsonViewer } from '../../../components/JsonViewer';

import { useFlow } from '../context/FlowContext';
import { ExportButton } from './ExportButton';
import { Panel } from '@xyflow/react';

export const JsonViewerPanel = () => {
  const { generateFlowJson, handleExport } = useFlow();
  
  return (
    <div>
      <Panel position='top-right'>
        <ExportButton onExport={handleExport} />
      </Panel>
      <Panel position='bottom-right'>
        <JsonViewer data={generateFlowJson()} />  
      </Panel>

      
    </div>
  );
};