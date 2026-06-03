import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const ConditionNode = ({ id }) => {
  const handles = [
    {
      type: "target",
      position: Position.Left,
      id: `${id}-input`
    },
    {
      type: "source",
      position: Position.Right,
      id: `${id}-true`,
      style: { top: "35%" }
    },
    {
      type: "source",
      position: Position.Right,
      id: `${id}-false`,
      style: { top: "65%" }
    }
  ];

  return (
    <BaseNode
      title="🔀 Condition Node"
      id={id}
      handles={handles}
    >
      <div
        style={{
          background: "#334155",
          padding: "10px",
          borderRadius: "8px",
          color: "#F8FAFC",
          fontWeight: "500",
          textAlign: "center",
        }}
      >
        If / Else Logic
      </div>
    </BaseNode>
  );
};