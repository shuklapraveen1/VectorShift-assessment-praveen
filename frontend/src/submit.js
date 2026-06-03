import { useState, useEffect } from "react";
import { useStore } from "./store";


export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const startResetAnimation = useStore(
    (state) => state.startResetAnimation
  );

  const finishResetAnimation = useStore(
    (state) => state.finishResetAnimation
  );

  const autoArrange = useStore(
    (state) => state.autoArrange
  );

  const setPipeline = useStore(
    (state) => state.setPipeline
  );

  const [animatedNodes, setAnimatedNodes] =
  useState(0);

  const [animatedEdges, setAnimatedEdges] =
  useState(0);

  const [result, setResult] = useState(null);
  useEffect(() => {
    if (!result) return;

    let nodeCount = 0;
    let edgeCount = 0;

    const interval = setInterval(() => {
        nodeCount++;

        if (
        nodeCount <= result.num_nodes
        ) {
        setAnimatedNodes(nodeCount);
        }

        edgeCount++;

        if (
        edgeCount <= result.num_edges
        ) {
        setAnimatedEdges(edgeCount);
        }

        if (
        nodeCount >= result.num_nodes &&
        edgeCount >= result.num_edges
        ) {
        clearInterval(interval);
        }
    }, 100);

    return () =>
        clearInterval(interval);
    }, [result]);
  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/pipelines/parse",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nodes,
            edges,
          }),
        }
      );

      const data = await response.json();

      setResult(data);

      setTimeout(() => {
        setResult(null);
      }, 5000);
    } catch (error) {
      console.error(error);

      setResult({
        num_nodes: nodes.length,
        num_edges: edges.length,
        is_dag: false,
      });
    }
  };

  const handleExport = () => {
    const pipeline = {
      nodes,
      edges,
    };

    const blob = new Blob(
      [JSON.stringify(pipeline, null, 2)],
      {
        type: "application/json",
      }
    );

    const url = URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      "vectorshift-pipeline.json";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  const handleImport = (event) => {
    const file =
      event.target.files?.[0];

    if (!file) return;

    const reader =
      new FileReader();

    reader.onload = (e) => {
      try {
        const pipeline =
          JSON.parse(e.target.result);

        setPipeline(
          pipeline.nodes || [],
          pipeline.edges || []
        );

        alert(
          "✅ Pipeline imported successfully"
        );
      } catch {
        alert(
          "❌ Invalid pipeline file"
        );
      }
    };

    reader.readAsText(file);
  };

  return (
    <>
      {/* DAG POPUP */}
      {result && (
        <div
          style={{
            position: "fixed",
            top: 180,
            left: "50%",
            transform:
              "translateX(-50%)",

            zIndex: 10000,

            background:
              "linear-gradient(145deg,#0F172A,#1E293B)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",

            color: "white",

            padding: "22px 32px",

            borderRadius: "18px",

            border:
              "1px solid #334155",

            minWidth: "320px",

            boxShadow:
            "0 25px 60px rgba(0,0,0,.45)",

            animation:
              "dropIn .4s ease, fadeOutCard 4s forwards",
          }}
        >
          <div
            style={{
              fontSize: "20px",
              fontWeight: "700",
              marginBottom: "16px",
              textAlign: "center",
            }}
          >
            🚀 Pipeline Analysis
          </div>

          <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 12,
                fontSize: "18px",
                fontWeight: "500",
            }}
            >
            <span>Nodes</span>

            <span
                style={{
                color: "#60A5FA",
                fontWeight: "700",
                }}
            >
                {animatedNodes}
            </span>
            </div>

            <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 20,
                fontSize: "18px",
                fontWeight: "500",
            }}
            >
            <span>Edges</span>

            <span
                style={{
                color: "#A78BFA",
                fontWeight: "700",
                }}
            >
                {animatedEdges}
            </span>
            </div>

          <div
            style={{
                textAlign: "center",
                fontSize: "24px",
                fontWeight: 700,
                color: result.is_dag
                ? "#22C55E"
                : "#EF4444",
            }}
            >
            {result.is_dag
                ? "✅ Valid DAG"
                : "❌ Cycle Detected"}
            </div>
        </div>
      )}

      {/* IMPORT INPUT */}
      <input
        type="file"
        accept=".json"
        id="pipeline-import"
        style={{
          display: "none",
        }}
        onChange={handleImport}
      />

      {/* BUTTON BAR */}
      <div
        style={{
          position: "fixed",
          top: 115,
          right: 25,

          display: "flex",
          gap: "12px",

          zIndex: 9999,
        }}
      >
        {/* IMPORT */}
        <button
          onClick={() =>
            document
              .getElementById(
                "pipeline-import"
              )
              .click()
          }
          style={{
            background:
              "linear-gradient(135deg,#10B981,#059669)",

            color: "white",

            border: "none",

            padding:
              "14px 24px",

            borderRadius: "12px",

            cursor: "pointer",

            fontWeight: "700",

            fontSize: "15px",

            boxShadow:
              "0 8px 25px rgba(16,185,129,.35)",
          }}
        >
          📥 Import
        </button>

        {/* EXPORT */}
        <button
          onClick={handleExport}
          style={{
            background:
              "linear-gradient(135deg,#F59E0B,#F97316)",

            color: "white",

            border: "none",

            padding:
              "14px 24px",

            borderRadius: "12px",

            cursor: "pointer",

            fontWeight: "700",

            fontSize: "15px",

            boxShadow:
              "0 8px 25px rgba(245,158,11,.35)",
          }}
        >
          📤 Export
        </button>

        {/* AUTO ARRANGE */}
        <button
          onClick={autoArrange}
          style={{
            background:
              "linear-gradient(135deg,#14B8A6,#06B6D4)",

            color: "white",

            border: "none",

            padding:
              "14px 24px",

            borderRadius: "12px",

            cursor: "pointer",

            fontWeight: "700",

            fontSize: "15px",

            boxShadow:
              "0 8px 25px rgba(6,182,212,.35)",
          }}
        >
          ✨ Auto Arrange
        </button>

        {/* RESET */}
        <button
          onClick={() => {
            startResetAnimation();

            setTimeout(() => {
              finishResetAnimation();
            }, 2000);
          }}
          style={{
            background:
              "linear-gradient(135deg,#EF4444,#DC2626)",

            color: "white",

            border: "none",

            padding:
              "14px 24px",

            borderRadius: "12px",

            cursor: "pointer",

            fontWeight: "700",

            fontSize: "15px",

            boxShadow:
              "0 8px 25px rgba(239,68,68,.35)",
          }}
        >
          🗑 Reset
        </button>

        {/* SUBMIT */}
        <button
          onClick={handleSubmit}
          style={{
            background:
              "linear-gradient(135deg,#2563EB,#7C3AED)",

            color: "white",

            border: "none",

            padding:
              "14px 28px",

            borderRadius: "12px",

            cursor: "pointer",

            fontWeight: "700",

            fontSize: "15px",

            boxShadow:
              "0 8px 25px rgba(37,99,235,.4)",
          }}
        >
          🚀 Submit Pipeline
        </button>
      </div>
    </>
  );
};