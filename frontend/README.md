# ⚡ VectorShift AI Workflow Builder

A modern drag-and-drop workflow editor built for the VectorShift Frontend Technical Assessment.

## 🚀 Features

### Core Requirements

* Drag and drop workflow nodes
* Custom React Flow nodes
* Dynamic node creation
* Input, Output, LLM, Text, API, Delay, Number, Math, and Condition nodes
* Pipeline submission to FastAPI backend
* DAG (Directed Acyclic Graph) validation
* Node and edge counting

---

## ✨ Enhancements Added

### 🎨 Modern UI/UX

* Premium dark-themed interface
* Gradient action buttons
* Glowing interactive node handles
* Responsive layout
* Smooth hover animations
* Glassmorphism-inspired analysis popup

### ⚙️ Workflow Features

* Click-to-create nodes
* Drag-to-create nodes
* Node deletion via button
* Delete key support
* Resizable nodes
* Auto Arrange Layout (Dagre)
* MiniMap navigation
* Animated edge connections
* Connection validation

### 📂 Import / Export

* Export workflow as JSON
* Import workflow from JSON
* Save and restore complete pipelines

### 🔄 Reset System

Custom animated reset experience:

1. Canvas folds into paper
2. Paper compresses into a ball
3. Ball flies toward trash can
4. Trash can receives workflow
5. Fresh canvas is restored

### 📊 Pipeline Analysis

Displays:

* Total Nodes
* Total Edges
* DAG Validation Status

with animated analysis popup.

---

## 🏗️ Tech Stack

### Frontend

* React
* React Flow
* Zustand
* Dagre

### Backend

* FastAPI
* Python

---

## 📁 Project Structure

```text
frontend/
├── src/
│   ├── nodes/
│   ├── store.js
│   ├── toolbar.js
│   ├── ui.js
│   ├── submit.js
│   ├── ResetAnimation.jsx
│   └── App.js

backend/
├── main.py
```

---

## ⚡ Installation

### Frontend

```bash
cd frontend
npm install
npm start
```

Runs on:

```text
http://localhost:3000
```

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Runs on:

```text
http://localhost:8000
```

---

## 🔗 API Endpoint

### Parse Pipeline

```http
POST /pipelines/parse
```

Request:

```json
{
  "nodes": [...],
  "edges": [...]
}
```

Response:

```json
{
  "num_nodes": 4,
  "num_edges": 4,
  "is_dag": true
}
```

---

## 🎯 Assessment Highlights

Beyond the assessment requirements, the project includes:

* Auto Layout using Dagre
* Import / Export Pipeline
* Premium UI Styling
* Animated Reset Workflow
* Resizable Nodes
* Enhanced DAG Analysis Popup
* Interactive Minimap
* Dynamic Workflow Building Experience

---

## 👨‍💻 Author

**Praveen Shukla**

GitHub:
https://github.com/shuklapraveen1

Repository:
https://github.com/shuklapraveen1/VectorShift-assessment-praveen
