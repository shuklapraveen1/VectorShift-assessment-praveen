// Text Node component representing a text template in the workflow.
// It has one output handle that can be connected to other nodes.
// The text can contain variables in the format {{variableName}} which are extracted and displayed.
import { useState } from "react";
import { Handle, Position } from "reactflow";
import { BaseNode } from "./BaseNode";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(
    data?.text || "{{input}}"
  );

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  const extractVariables = (text) => {
    const regex =
      /{{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*}}/g;

    return [...text.matchAll(regex)].map(
      (match) => match[1]
    );
  };

  const variables = extractVariables(currText);

  const width = Math.min(
    Math.max(250, currText.length * 4),
    600
  );

  const minHeight = Math.max(
    150,
    currText.split("\n").length * 40
  );

  return (
    <div style={{ position: "relative" }}>

      {variables.map((variable, index) => (
        <Handle
          key={variable}
          type="target"
          position={Position.Left}
          id={`${id}-${variable}`}
          style={{
            top: 60 + index * 30,
            background: "#6366F1",
          }}
        />
      ))}

      <BaseNode
        title="Text Node"
        id={id}
        handles={[
          {
            type: "source",
            position: Position.Right,
            id: `${id}-output`,
            style: {
              background: "#10B981",
            },
          },
        ]}
        width={width}
        minHeight={minHeight}
      >
        <textarea
          value={currText}
          onChange={handleTextChange}
          rows={Math.max(
            3,
            currText.split("\n").length
          )}
          style={{
            width: "100%",
            minHeight: 80,
            resize: "none",
            padding: 8,
            borderRadius: 6,
            boxSizing: "border-box",
          }}
        />

        <div
          style={{
            fontSize: 12,
            marginTop: 8,
            color: "#94A3B8",
          }}
        >
          Variables:
          {" "}
          {variables.length
            ? variables.join(", ")
            : "None"}
        </div>
      </BaseNode>

    </div>
  );
};