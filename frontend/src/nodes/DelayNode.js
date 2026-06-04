// Delay Node component representing a wait/delay in the workflow.
// It has one input handle for the trigger and one output handle for the delayed execution.
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const DelayNode = ({ id }) => {
  const handles = [
    {
      type: "target",
      position: Position.Left,
      id: `${id}-input`
    },
    {
      type: "source",
      position: Position.Right,
      id: `${id}-output`
    }
  ];

  return (
    <BaseNode 
        title="Delay Node" 
        id={id} 
        handles={handles}>
      <span>Wait before execution</span>
    </BaseNode>
  );
};