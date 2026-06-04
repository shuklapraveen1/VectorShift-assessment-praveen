import { useState } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName ||
      id.replace("customOutput-", "output_")
  );

  const [outputType, setOutputType] = useState(
    data?.outputType || "Text"
  );

  const result = data?.result || "";

  const handles = [
    {
      type: "target",
      position: Position.Left,
      id: `${id}-value`,
      style: {
        background: "#6366F1",
      },
    },
  ];

  return (
    <BaseNode
      title="Output Node"
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
          value={outputType}
          onChange={(e) =>
            setOutputType(e.target.value)
          }
          style={{
            padding: 6,
            borderRadius: 8,
            border: "1px solid #475569",
            background: "#F8FAFC",
          }}
        >
          <option>Text</option>
          <option>Image</option>
        </select>
      </label>

      {/* RESULT */}
      <label
        style={{
          fontSize: 12,
          display: "flex",
          flexDirection: "column",
          gap: 4,
          marginTop: 12,
        }}
      >
        Result

        <div
          style={{
            background: "#020617",
            color: "#22C55E",
            border: "1px solid #334155",
            borderRadius: 8,
            padding: 10,
            minHeight: 60,
            fontFamily: "monospace",
            whiteSpace: "pre-wrap",
            overflowWrap: "break-word",
          }}
        >
          {result || "> waiting..."}
        </div>
      </label>
    </BaseNode>
  );
};