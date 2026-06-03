import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const MathNode = ({ id }) => {
  const handles = [
    {
      type: "target",
      position: Position.Left,
      id: `${id}-a`,
      style: { top: "35%" }
    },
    {
      type: "target",
      position: Position.Left,
      id: `${id}-b`,
      style: { top: "65%" }
    },
    {
      type: "source",
      position: Position.Right,
      id: `${id}-result`
    }
  ];

  return (
    <BaseNode 
        title="Math Node"
        id={id}
        handles={handles}>
      <select>
        <option>+</option>
        <option>-</option>
        <option>*</option>
        <option>/</option>
      </select>
    </BaseNode>
  );
};