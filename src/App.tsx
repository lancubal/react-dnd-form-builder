import React, { useState, useRef } from 'react';
import { Sidebar } from './components/Sidebar';
import { Canvas } from './components/Canvas';
import { PropertiesPanel } from './components/PropertiesPanel';
import { PreviewModal } from './components/PreviewModal';
import { useFormStore } from './store';
import { Eye, Save, Upload } from 'lucide-react';

function App() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const { elements, setElements } = useFormStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    console.log(JSON.stringify(elements, null, 2));
    alert('Form JSON logged to console!');
  };

  const handleLoadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        if (Array.isArray(json)) {
          setElements(json);
        } else {
          alert('Invalid JSON format: Expected an array of elements.');
        }
      } catch (error) {
        console.error('Error parsing JSON:', error);
        alert('Error parsing JSON file.');
      }
    };
    reader.readAsText(file);
    // Reset file input so the same file can be selected again
    event.target.value = '';
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 shadow-sm z-10">
        <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <span className="bg-blue-600 text-white p-1 rounded">FB</span>
          Form Builder
        </h1>

        <div className="flex items-center gap-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json"
            className="hidden"
          />
          <button
            onClick={handleLoadClick}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Upload size={16} />
            Load JSON
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Save size={16} />
            Save to Console
          </button>
          <button
            onClick={() => setIsPreviewOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Eye size={16} />
            Preview
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        <Sidebar />
        <Canvas />
        <PropertiesPanel />
      </main>

      {/* Modals */}
      <PreviewModal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} />
    </div>
  );
}

export default App;