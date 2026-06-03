import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const NumberNode = ({ id }) => {
  const handles = [
    {
      type: "source",
      position: Position.Right,
      id: `${id}-value`
    }
  ];

  return (
    <BaseNode 
        title="Number Node" 
        id={id} 
        handles={handles}>
      <input
        type="number"
        defaultValue={0}
      />
    </BaseNode>
  );
};