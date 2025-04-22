import FlowEditor from './features/editor/FlowEditor';
import './styles/tailwind.css';
import '@xyflow/react/dist/style.css';

function App() {
  return (
    <div className="w-full h-screen">
      <FlowEditor />
    </div>
  );
}

export default App;