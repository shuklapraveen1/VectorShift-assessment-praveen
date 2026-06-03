import { useState } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_")
  );

  const [inputType, setInputType] = useState(
    data?.inputType || "Text"
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
          onChange={(e) =>
            setCurrName(e.target.value)
          }
          style={{
            padding: 6,
            borderRadius: 8,
            border: "1px solid #475569",
            background: "#F8FAFC",
          }}
        />
      </label>

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
          onChange={(e) =>
            setInputType(e.target.value)
          }
          style={{
            padding: 6,
            borderRadius: 8,
            border: "1px solid #475569",
            background: "#F8FAFC",
          }}
        >
          <option>Text</option>
          <option>File</option>
        </select>
      </label>
    </BaseNode>
  );
};