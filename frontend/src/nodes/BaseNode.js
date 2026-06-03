import React from "react";
import { Handle } from "reactflow";
import { useStore } from "../store";

export const BaseNode = ({
  id,
  title,
  children,
  handles = [],
  width = 320,
  minHeight = 100,
}) => {
  const deleteNode = useStore(
    (state) => state.deleteNode
  );

  const [editing, setEditing] =
    React.useState(false);

  const [nodeTitle, setNodeTitle] =
    React.useState(title);

  return (
    <div
      style={{
        position: "relative",

        width,
        minHeight,

        borderRadius: 16,
        padding: 16,

        background:
          "linear-gradient(145deg,#1E293B,#0F172A)",

        color: "#F8FAFC",

        boxShadow:
          "0 12px 30px rgba(15,23,42,0.35)",

        border:
          "1px solid #334155",

        resize: "both",
        overflow: "hidden",

        animation:
          "nodePop .35s cubic-bezier(.18,.89,.32,1.28)",
      }}
    >
      {/* Delete Button */}
      <button
        onClick={() => deleteNode(id)}
        style={{
          position: "absolute",
          top: 8,
          right: 8,

          border: "none",

          background: "#EF4444",
          color: "white",

          borderRadius: "50%",

          width: 22,
          height: 22,

          cursor: "pointer",

          fontWeight: "bold",
        }}
      >
        ×
      </button>

      {/* Editable Title */}
      <div
        style={{
          fontWeight: 600,
          marginBottom: 10,
          color: "#818CF8",
          paddingRight: 25,
        }}
      >
        {editing ? (
          <input
            value={nodeTitle}
            autoFocus
            onBlur={() =>
              setEditing(false)
            }
            onChange={(e) =>
              setNodeTitle(
                e.target.value
              )
            }
            style={{
              width: "100%",
              padding: "4px 8px",
              borderRadius: 6,
              border:
                "1px solid #475569",
            }}
          />
        ) : (
          <div
            onDoubleClick={() =>
              setEditing(true)
            }
            style={{
              cursor: "pointer",
            }}
            title="Double click to rename"
          >
            {nodeTitle}
          </div>
        )}
      </div>

      {children}

      {handles.map((h, idx) => (
        <Handle
          key={idx}
          type={h.type}
          position={h.position}
          id={h.id}
          style={{
            width: 14,
            height: 14,

            border:
              "2px solid white",

            background:
              "#6366F1",

            boxShadow:
              "0 0 12px rgba(99,102,241,.6)",

            transition:
              "all .2s ease",

            ...h.style,
          }}
        />
      ))}
    </div>
  );
};