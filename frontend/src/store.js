// store.js

import { create } from "zustand";

import dagre from "dagre";

import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
  } from 'reactflow';

export const useStore = create((set, get) => ({
    nodes: [],
    edges: [],
    nodeIDs: {},
    
    getNodeID: (type) => {
        const newIDs = {...get().nodeIDs};
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({nodeIDs: newIDs});
        return `${type}-${newIDs[type]}`;
    },
    setPipeline: (nodes, edges) =>
      set({
        nodes,
        edges,
      }),
    addNode: (node) => {
        set({
            nodes: [...get().nodes, node]
        });
    },
    onNodesChange: (changes) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },
    onEdgesChange: (changes) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
    onConnect: (connection) => {
      set({
        edges: addEdge({...connection, type: 'smoothstep', animated: true, markerEnd: {type: MarkerType.Arrow, height: '20px', width: '20px'}}, get().edges),
      });
    },
    updateNodeField: (nodeId, fieldName, fieldValue) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            node.data = { ...node.data, [fieldName]: fieldValue };
          }
  
          return node;
        }),
      });
    },

    updateNodeData: (nodeId, data) =>
      set({
        nodes: get().nodes.map((node) =>
          node.id === nodeId
            ? {
                ...node,
                data: {
                  ...node.data,
                  ...data,
                },
              }
            : node
        ),
      }),
    // RESET ANIMATION STATE
    isResetting: false,

    startResetAnimation: () =>
      set({
        isResetting: true,
      }),

    finishResetAnimation: () =>
      set({
        isResetting: false,
        nodes: [],
        edges: [],
      }),
      autoArrange: () => {
      const nodes = [...get().nodes];
      const edges = get().edges;

      // If graph has connections use Dagre
      if (edges.length > 0) {
        const dagreGraph =
          new dagre.graphlib.Graph();

        dagreGraph.setDefaultEdgeLabel(
          () => ({})
        );

        dagreGraph.setGraph({
          rankdir: "TB",
          nodesep: 80,
          ranksep: 120,
        });

        nodes.forEach((node) => {
          dagreGraph.setNode(node.id, {
            width: 250,
            height: 120,
          });
        });

        edges.forEach((edge) => {
          dagreGraph.setEdge(
            edge.source,
            edge.target
          );
        });

        dagre.layout(dagreGraph);

        const layoutedNodes = nodes.map(
          (node) => {
            const pos =
              dagreGraph.node(node.id);

            return {
              ...node,
              position: {
                x: window.innerWidth / 2 - 125,
                y: pos.y,
              },
            };
          }
        );

        set({
          nodes: layoutedNodes,
        });

        return;
      }

      // Fallback when no edges exist

      const startX = window.innerWidth * 0.35;

      const startY = 180;

      const layoutedNodes = nodes.map(
        (node, index) => ({
          ...node,
          position: {
            x: startX,
            y: startY + index * 180,
          },
        })
      );

      set({
        nodes: layoutedNodes,
      });
    },

    deleteNode: (nodeId) =>
      set((state) => ({
        nodes: state.nodes.filter(
          (node) => node.id !== nodeId
        ),
        edges: state.edges.filter(
          (edge) =>
            edge.source !== nodeId &&
            edge.target !== nodeId
        ),
  })),
    
}));
