// toolbar.js - Defines the PipelineToolbar component which renders the top toolbar of the workflow editor UI. The toolbar includes the application title and a set of draggable node types that users can drag and drop onto the canvas to create new nodes in their workflow. Each draggable node is represented by the DraggableNode component, which handles the drag start event to set the node type in the data transfer object for later use when dropping onto the canvas.
import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
  return (
    <div
      style={{
        background: "#0F172A",
        padding: "12px 20px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
        borderBottom: "1px solid #1E293B",
        display: "flex",
        alignItems: "center",
        gap: "20px",
        paddingLeft: "20px",
        zIndex: 1000,
      }}
    >
    <div>
        <div
            style={{
            color: "white",
            fontSize: "20px",
            fontWeight: "800",
            whiteSpace: "nowrap",
            }}
        >
            ⚡ VectorShift 
        </div>

        <div
            style={{
            color: "#94A3B8",
            fontSize: "11px",
            marginTop: 4,
            }}
        >
            AI Workflow Builder
        </div>
    </div>

      <div
        style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginLeft: "30px",
        }}
      >
        <DraggableNode type='customInput' label='📥 Input' />
        <DraggableNode type='llm' label='🤖 LLM' />
        <DraggableNode type='customOutput' label='📤 Output' />
        <DraggableNode type='text' label='📝 Text' />
        <DraggableNode type='math' label='🧮 Math' />
        <DraggableNode type='number' label='🔢 Number' />
        <DraggableNode type='api' label='🌐 API' />
        <DraggableNode type='condition' label='🔀 Condition' />
        <DraggableNode type='delay' label='⏳ Delay' />
      </div>
    </div>
  );
};