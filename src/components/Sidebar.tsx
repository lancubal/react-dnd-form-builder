import React from 'react';
import { useFormStore } from '../store';
import type { FormElementType } from '../types';
import { Type, FileText, Hash, List, CheckSquare, Heading, AlignLeft, Minus } from 'lucide-react';

const availableFields: { type: FormElementType; label: string; icon: React.ElementType }[] = [
  { type: 'text', label: 'Text Input', icon: Type },
  { type: 'textarea', label: 'Text Area', icon: FileText },
  { type: 'number', label: 'Number', icon: Hash },
  { type: 'select', label: 'Dropdown', icon: List },
  { type: 'checkbox', label: 'Checkbox', icon: CheckSquare },
];

const layoutElements: { type: FormElementType; label: string; icon: React.ElementType }[] = [
  { type: 'header', label: 'Header', icon: Heading },
  { type: 'paragraph', label: 'Paragraph', icon: AlignLeft },
  { type: 'separator', label: 'Separator', icon: Minus },
];

export const Sidebar: React.FC = () => {
  const addElement = useFormStore((state) => state.addElement);

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col gap-6 overflow-y-auto">
      <div>
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Input Fields</h2>
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

      <div>
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Layout Elements</h2>
        <div className="flex flex-col gap-2">
          {layoutElements.map((element) => (
            <button
              key={element.type}
              onClick={() => addElement(element.type)}
              className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-purple-50 border border-gray-200 hover:border-purple-200 rounded-lg transition-colors text-left group"
            >
              <element.icon className="w-5 h-5 text-gray-500 group-hover:text-purple-500" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-purple-700">
                {element.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
