import React from 'react';
import { useFormStore } from '../store';
import { X, Plus, Trash } from 'lucide-react';

export const PropertiesPanel: React.FC = () => {
  const { elements, selectedId, updateElement, selectElement } = useFormStore();
  const selectedElement = elements.find((el) => el.id === selectedId);

  if (!selectedElement) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 p-6 flex flex-col items-center justify-center text-gray-500">
        <p>Select an element to edit its properties</p>
      </div>
    );
  }

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
        <h2 className="font-semibold text-gray-800">Properties</h2>
        <button
          onClick={() => selectElement(null)}
          className="text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
        {/* Label */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">Label</label>
          <input
            type="text"
            value={selectedElement.label}
            onChange={(e) => updateElement(selectedElement.id, { label: e.target.value })}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Placeholder - Only for text inputs */}
        {(selectedElement.type === 'text' || selectedElement.type === 'textarea' || selectedElement.type === 'number') && (
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Placeholder</label>
            <input
              type="text"
              value={selectedElement.placeholder || ''}
              onChange={(e) => updateElement(selectedElement.id, { placeholder: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* Required Toggle */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="required"
            checked={selectedElement.required || false}
            onChange={(e) => updateElement(selectedElement.id, { required: e.target.checked })}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="required" className="text-sm font-medium text-gray-700 cursor-pointer">
            Required Field
          </label>
        </div>

        {/* Options - Only for Select inputs */}
        {selectedElement.type === 'select' && (
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-700">Options</label>
              <button
                onClick={() => {
                  const newOptions = [...(selectedElement.options || []), `Option ${(selectedElement.options?.length || 0) + 1}`];
                  updateElement(selectedElement.id, { options: newOptions });
                }}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
              >
                <Plus size={14} /> Add Option
              </button>
            </div>
            <div className="flex flex-col gap-2">
              {selectedElement.options?.map((option, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...(selectedElement.options || [])];
                      newOptions[index] = e.target.value;
                      updateElement(selectedElement.id, { options: newOptions });
                    }}
                    className="flex-1 border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => {
                      const newOptions = selectedElement.options?.filter((_, i) => i !== index);
                      updateElement(selectedElement.id, { options: newOptions });
                    }}
                    className="text-red-500 hover:text-red-700 p-1"
                    disabled={(selectedElement.options?.length || 0) <= 1}
                  >
                    <Trash size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4 border-t border-gray-200 bg-gray-50 text-xs text-gray-500 font-mono break-all">
        ID: {selectedElement.id}
      </div>
    </div>
  );
};
