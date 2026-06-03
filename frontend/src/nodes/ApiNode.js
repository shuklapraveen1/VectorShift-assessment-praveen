import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const ApiNode = ({ id }) => {
  const handles = [
    {
      type: "target",
      position: Position.Left,
      id: `${id}-request`
    },
    {
      type: "source",
      position: Position.Right,
      id: `${id}-response`
    }
  ];

  return (
    <BaseNode
      title="🌐 API Node"
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
        External API Call
      </div>
    </BaseNode>
  );
};