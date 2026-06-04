# Backend API implemented with FastAPI to handle workflow parsing and execution logic.
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from collections import defaultdict, deque

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pipeline schema received from the frontend
class Pipeline(BaseModel):
    nodes: list
    edges: list
    


@app.get("/")
def root():
    return {"status": "running"}

# Analyze workflow structure and verify DAG validity
@app.post("/pipelines/parse")
def parse_pipeline(pipeline: Pipeline):

    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    # Build adjacency list representation of graph
    graph = defaultdict(list)
    indegree = defaultdict(int)

    for edge in pipeline.edges:
        source = edge["source"]
        target = edge["target"]

        graph[source].append(target)
        indegree[target] += 1

    queue = deque()

    for node in pipeline.nodes:
        node_id = node["id"]

        if indegree[node_id] == 0:
            queue.append(node_id)

    visited = 0
    # Kahn's Algorithm for cycle detection
    while queue:
        current = queue.popleft()
        visited += 1

        for neighbor in graph[current]:
            indegree[neighbor] -= 1

            if indegree[neighbor] == 0:
                queue.append(neighbor)
    # Graph is a DAG only if every node is visited in the topological sort
    is_dag = visited == num_nodes

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag,
    }

@app.post("/pipelines/run")
def run_pipeline(pipeline: Pipeline):

    try:
        input_nodes = [
            node
            for node in pipeline.nodes
            if node["type"] == "customInput"
        ]

        math_nodes = [
            node
            for node in pipeline.nodes
            if node["type"] == "math"
        ]

        if len(input_nodes) < 2:
            return {
                "success": False,
                "message": "Need at least 2 input nodes"
            }

        if len(math_nodes) == 0:
            return {
                "success": False,
                "message": "No Math Node found"
            }

        a = input_nodes[0]["data"].get("value", "")
        b = input_nodes[1]["data"].get("value", "")

        operation = (
            math_nodes[0]["data"]
            .get("operation", "+")
        )

        try:
            a_num = float(a)
            b_num = float(b)

            if operation == "+":
                result = a_num + b_num

            elif operation == "-":
                result = a_num - b_num

            elif operation == "*":
                result = a_num * b_num

            elif operation == "/":
                result = (
                    a_num / b_num
                    if b_num != 0
                    else "Division by zero"
                )

            else:
                result = "Unknown operation"

        except ValueError:

            if operation == "+":
                result = str(a) + str(b)

            else:
                result = (
                    "Text values only support +"
                )

        return {
            "success": True,
            "result": result
        }

    except Exception as e:
        return {
            "success": False,
            "message": str(e)
        }