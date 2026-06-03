export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };

    event.target.style.cursor = "grabbing";

    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );

    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className={type}
      onDragStart={(event) =>
        onDragStart(event, type)
      }
      onClick={() => {
        const event = new CustomEvent(
          "addNode",
          {
            detail: {
              type,
            },
          }
        );

        window.dispatchEvent(event);
      }}
      onDragEnd={(event) =>
        (event.target.style.cursor = "grab")
      }
      style={{
        cursor: "grab",

        minWidth: "95px",
        height: "56px",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        borderRadius: "16px",

        background:
          "linear-gradient(145deg,#1E293B,#111827)",

        border:
          "1px solid rgba(99,102,241,.3)",

        boxShadow:
          "0 8px 20px rgba(15,23,42,.35)",

        transition: "all .25s ease",

        color: "white",
        fontWeight: "700",
        fontSize: "13px",

        backdropFilter: "blur(8px)",
      }}
      draggable
      onMouseEnter={(e) => {
        e.currentTarget.style.transform =
          "translateY(-2px)";

        e.currentTarget.style.boxShadow =
          "0 0 25px rgba(99,102,241,.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform =
          "translateY(0px)";

        e.currentTarget.style.boxShadow =
          "0 0 25px rgba(99,102,241,.4)";
      }}
    >
      {label}
    </div>
  );
};