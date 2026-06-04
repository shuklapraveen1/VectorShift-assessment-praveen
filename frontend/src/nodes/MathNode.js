// Math Node component representing a mathematical operation in the workflow.
// It has two input handles for operands and one output handle for the result.
import { useState } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";
import { useStore } from "../store";

export const MathNode = ({ id, data }) => {
  const updateNodeField = useStore(
    (state) => state.updateNodeField
  );

  const [operation, setOperation] = useState(
    data?.operation || "+"
  );

  const handles = [
    {
      type: "target",
      position: Position.Left,
      id: `${id}-a`,
      style: {
        top: "35%",
      },
    },
    {
      type: "target",
      position: Position.Left,
      id: `${id}-b`,
      style: {
        top: "65%",
      },
    },
    {
      type: "source",
      position: Position.Right,
      id: `${id}-result`,
    },
  ];

  return (
    <BaseNode
      title="Math Node"
      id={id}
      handles={handles}
      minHeight={140}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <label
          style={{
            fontSize: 13,
            color: "#CBD5E1",
          }}
        >
          Operation
        </label>

        <select
          value={operation}
          onChange={(e) => {
            setOperation(e.target.value);

            updateNodeField(
              id,
              "operation",
              e.target.value
            );
          }}
          style={{
            padding: "8px",
            borderRadius: "8px",
            border: "1px solid #475569",
            background: "#F8FAFC",
            fontSize: "14px",
          }}
        >
          <option value="+">
            Addition (+)
          </option>

          <option value="-">
            Subtraction (-)
          </option>

          <option value="*">
            Multiplication (*)
          </option>

          <option value="/">
            Division (/)
          </option>
        </select>
      </div>
    </BaseNode>
  );
};