# React DnD Form Builder

A professional, "No-Code" form builder built with React 19, TypeScript, and Tailwind CSS. This project demonstrates complex state management, dynamic component rendering, and drag-and-drop interactions.

![Dashboard Preview](./public/screenshots/dashboard.png)

## 🚀 Features

- **Drag & Drop Interface**: Reorder form elements intuitively using `@dnd-kit`.
- **Dynamic Element Registry**: Scalable architecture to add new input types (Text, Number, Select, etc.).
- **Complex State Management**: Powered by **Zustand** for high-performance updates without unnecessary re-renders.
- **Real-time Property Editor**: Modify labels, placeholders, requirement constraints, and select options on the fly.
- **Live Preview**: See exactly how the end-user will interact with your form.
- **JSON Import/Export**: Save your form configuration to JSON or load existing ones to continue editing.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Drag & Drop**: [@dnd-kit](https://dndkit.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Utilities**: `nanoid`, `classnames`

## 📦 Architecture Highlights

### 1. The JSON Schema
The entire form is represented by a serialized JSON array. This decouples the **Editor** logic from the **Renderer** logic, making it easy to store forms in any database.

### 2. Registry Pattern
Components are rendered through a `FieldRegistry`. This allows developers to add new field types by simply creating a component and registering its type, without touching the core Canvas logic.

### 3. Optimized Renders
By using Zustand selectors, only the component being edited or moved is re-rendered, ensuring a smooth experience even with hundreds of form elements.

## 🏁 Getting Started

### Prerequisites
- Node.js (Latest LTS recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:lancubal/react-dnd-form-builder.git
   cd react-dnd-form-builder
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## 📖 Usage

1. **Add Fields**: Click on any field type in the left sidebar.
2. **Reorder**: Drag the "grip" icon on the left of any field to move it up or down.
3. **Edit**: Click on a field in the canvas to open the properties panel on the right.
4. **Preview**: Click the "Preview" button in the header to see the functional form.
5. **Persist**: Use "Save to Console" to get the JSON schema or "Load JSON" to import a previously saved form.

---
Created by [lancubal](https://github.com/lancubal)
