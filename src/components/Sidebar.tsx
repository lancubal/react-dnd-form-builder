import React from 'react';
import { useFormStore } from '../store';
import type { FormElementType } from '../types';
import { Type, FileText, Hash, List, CheckSquare } from 'lucide-react';

const availableFields: { type: FormElementType; label: string; icon: React.ElementType }[] = [
  { type: 'text', label: 'Text Input', icon: Type },
  { type: 'textarea', label: 'Text Area', icon: FileText },
  { type: 'number', label: 'Number', icon: Hash },
  { type: 'select', label: 'Dropdown', icon: List },
  { type: 'checkbox', label: 'Checkbox', icon: CheckSquare },
];

export const Sidebar: React.FC = () => {
  const addElement = useFormStore((state) => state.addElement);

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-gray-800">Form Elements</h2>
      <div className="flex flex-col gap-2">
        {availableFields.map((field) => (
          <button
            key={field.type}
            onClick={() => addElement(field.type)}
            className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-200 rounded-lg transition-colors text-left group"
          >
            <field.icon className="w-5 h-5 text-gray-500 group-hover:text-blue-500" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">
              {field.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
