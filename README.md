# Interactive Mindmap UI (React + D3)

## Overview

This project implements an interactive, data-driven mindmap UI using React and D3.js.
The application visualizes hierarchical data as a mindmap and supports rich interactions such as node expansion/collapse, hover highlighting, zooming, and contextual data display via a side panel.

The primary goal of this project is to demonstrate:

Data-driven UI rendering

Complex interactive visualization

Clean separation of data, logic, and UI

Practical use of D3 within a React application

## Tech Stack

### Framework & Libraries

React – Component-based UI and state management

D3.js – Tree layout, SVG rendering, zoom/pan, curved edges

JavaScript (ES6+)

CSS – Layout and styling

## Why D3 + React?

D3 handles layout, geometry, and interactions efficiently

React manages application state, side panels, and component structure

This hybrid approach avoids hardcoding visuals while keeping the UI scalable

## Features Implemented

### 1. Mindmap Visualization

Hierarchical tree rendered as a mindmap

Nodes connected with curved SVG edges

Clean and readable layout using a tree-based structure

### 2. Interactive Features

Click to expand/collapse nodes

Root expands to first level

Subsequent clicks expand only the selected subtree

Hover interactions

Highlights hovered node

Highlights directly connected edges and nodes

Fit to View

Automatically fits the currently visible tree into the viewport

Collapse All

Collapses the tree back to the root node

Smooth zoom & pan

Mouse wheel zoom

Drag to pan the canvas

### 3. Data Display

Side Panel

Displays detailed information of the selected node

Hover context

Quick visual feedback via highlighting

Node content (title, summary, metadata) is fully data-driven

## Data-Driven Architecture (Key Requirement)

The mindmap is generated entirely from a structured JSON file.

### How it works:

#### The JSON file defines:

Node hierarchy

Titles

Summaries / metadata

The UI does not hardcode nodes

#### Updating the JSON automatically updates:

The visual structure

Node labels

Side panel content

Project Structure
src/
├── components/
│   ├── MindMapCanvas.jsx   # D3 tree rendering & interactions
│   ├── SidePanel.jsx       # Selected node details
│   └── Toolbar.jsx         # Expand / Collapse / Fit controls
│
├── data/
│   └── mindmap.json        # Hierarchical data source
│
├── utils/
│   ├── buildHierarchy.js   # Converts JSON → d3.hierarchy
│   └── layoutTree.js       # Tree layout configuration
│
├── App.jsx                 # App-level state & composition
├── index.js
└── index.css

## Interaction Flow

### Initial View

Only the root node is visible

### Click Root

First-level nodes appear

### Click Any Node

Expands only that node’s subtree

Focus smoothly shifts to the selected node

### Collapse All

Returns the view to the root node

### Fit View

Fits the currently visible tree into the viewport

## Known Limitations / Intentional Omissions

Inline editing of nodes is not implemented

This was intentionally skipped to avoid over-engineering

Architecture supports future extension

Export / download functionality not implemented (bonus feature)

These decisions were made to prioritize correctness, clarity, and stability.

## How to Run Locally

npm install
npm start


## The app will run at:

http://localhost:3000

## Screenshots & Demo

<img width="1920" height="764" alt="Screenshot (877)" src="https://github.com/user-attachments/assets/b7a89283-a180-4baa-923b-53a141adc6f5" />

### Level 1 View 

<img width="1920" height="856" alt="Screenshot (878)" src="https://github.com/user-attachments/assets/0a95a11c-6a91-41a0-9c91-0f5767f7d132" />

### Fit View

<img width="1920" height="837" alt="Screenshot (879)" src="https://github.com/user-attachments/assets/ca5224a5-978a-45bd-bb11-d64ca10ee6c7" />

### Root View

## Conclusion

This project demonstrates:

Thoughtful handling of hierarchical data

Real-world use of D3 within React

Clean, maintainable frontend architecture

Focus on UX clarity over unnecessary complexity

It fulfills the core functional and technical requirements of the assignment while remaining extensible for future improvements.
