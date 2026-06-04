// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------
// The PipelineUI component sets up the main canvas area for the workflow editor using React Flow. It manages the state of nodes and edges using the global store, and handles drag-and-drop events to allow users to add new nodes to the canvas by dragging from the toolbar or clicking on a node type. The component also defines the available node types and their corresponding React components for rendering on the canvas.
import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { MathNode } from './nodes/MathNode';
import { NumberNode } from './nodes/NumberNode';
import { ApiNode } from './nodes/ApiNode';
import { ConditionNode } from './nodes/ConditionNode';
import { DelayNode } from './nodes/DelayNode';
import { useEffect } from "react";
import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  math: MathNode,
  number: NumberNode,
  api: ApiNode,
  condition: ConditionNode,
  delay: DelayNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
    
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect
    } = useStore(selector, shallow);

    const getInitNodeData = (nodeID, type) => {
      let nodeData = { id: nodeID, nodeType: `${type}` };
      return nodeData;
    }

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;
      
            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
              return;
            }
      
            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };
      
            addNode(newNode);
          }
        },
        [reactFlowInstance, addNode, getNodeID]
    );

    useEffect(() => {
      const listener = (e) => {
        const type = e.detail.type;

        const nodeID = getNodeID(type);

        addNode({
          id: nodeID,
          type,
          position: {
            x: 300 + Math.random() * 200,
            y: 150 + Math.random() * 200,
          },
          data: {
            id: nodeID,
            nodeType: type,
          },
        });
      };

      window.addEventListener(
        "addNode",
        listener
      );

      return () =>
        window.removeEventListener(
          "addNode",
          listener
        );
    }, [addNode, getNodeID]);


    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        <>
        <div
          ref={reactFlowWrapper}
          style={{
            width: "100vw",
            height: "calc(100vh - 80px)",
            background: "linear-gradient(135deg,#F8FAFC 0%,#E0E7FF 100%)"
          }}
          >
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                deleteKeyCode={["Delete"]}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType='smoothstep'
                
            >
                <Background
                  gap={24}
                  size={1.5}
                  color="#C7D2FE"
                />
                <Controls />
                <MiniMap
                  pannable
                  zoomable
                  style={{
                    width: 160,
                    height: 100,
                  }}
                />
            </ReactFlow>
        </div>
        </>
    )
}
