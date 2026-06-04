import { useState } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";
import { useStore } from "../store";

export const InputNode = ({ id, data }) => {
  const updateNodeField = useStore(
    (state) => state.updateNodeField
  );

  const [currName, setCurrName] = useState(
    data?.inputName ||
      id.replace("customInput-", "input_")
  );

  const [inputType, setInputType] = useState(
    data?.inputType || "Text"
  );

  const [inputValue, setInputValue] = useState(
    data?.value || ""
  );

  const handles = [
    {
      type: "source",
      position: Position.Right,
      id: `${id}-value`,
      style: {
        background: "#10B981",
      },
    },
  ];

  return (
    <BaseNode
      title="Input Node"
      id={id}
      handles={handles}
    >
      {/* NAME */}
      <label
        style={{
          fontSize: 12,
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        Name

        <input
          value={currName}
          onChange={(e) => {
            setCurrName(e.target.value);

            updateNodeField(
              id,
              "inputName",
              e.target.value
            );
          }}
          style={{
            padding: 6,
            borderRadius: 8,
            border: "1px solid #475569",
            background: "#F8FAFC",
          }}
        />
      </label>

      {/* TYPE */}
      <label
        style={{
          fontSize: 12,
          display: "flex",
          flexDirection: "column",
          gap: 4,
          marginTop: 8,
        }}
      >
        Type

        <select
          value={inputType}
          onChange={(e) => {
            setInputType(e.target.value);

            updateNodeField(
              id,
              "inputType",
              e.target.value
            );
          }}
          style={{
            padding: 6,
            borderRadius: 8,
            border: "1px solid #475569",
            background: "#F8FAFC",
          }}
        >
          <option>Text</option>
          <option>Number</option>
          <option>File</option>
        </select>
      </label>

      {/* VALUE */}
      <label
        style={{
          fontSize: 12,
          display: "flex",
          flexDirection: "column",
          gap: 4,
          marginTop: 8,
        }}
      >
        Value

        <input
          value={inputValue}
          placeholder="Enter value..."
          onChange={(e) => {
            setInputValue(e.target.value);

            updateNodeField(
              id,
              "value",
              e.target.value
            );
          }}
          style={{
            padding: 6,
            borderRadius: 8,
            border: "1px solid #475569",
            background: "#F8FAFC",
          }}
        />
      </label>
    </BaseNode>
  );
};