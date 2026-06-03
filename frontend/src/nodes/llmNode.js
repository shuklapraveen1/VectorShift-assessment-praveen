import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const LLMNode = ({ id }) => {
  const handles = [
    {
      type: "target",
      position: Position.Left,
      id: `${id}-system`,
      style: {
        top: "33%",
        background: "#6366F1",
      },
    },
    {
      type: "target",
      position: Position.Left,
      id: `${id}-prompt`,
      style: {
        top: "66%",
        background: "#6366F1",
      },
    },
    {
      type: "source",
      position: Position.Right,
      id: `${id}-response`,
      style: {
        background: "#10B981",
      },
    },
  ];

  return (
    <BaseNode
      title="LLM Engine"
      id={id}
      handles={handles}
    >
      <span
        style={{
          fontSize: 13,
          color: "#94A3B8",
        }}
      >
        Executes prompt against model
      </span>
    </BaseNode>
  );
};