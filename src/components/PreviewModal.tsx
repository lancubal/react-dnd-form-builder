import React, { useState, useEffect } from 'react';
import { useFormStore } from '../store';
import { renderField } from './FieldRegistry';
import { X } from 'lucide-react';
import type { FormElement } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const PreviewModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { elements, metadata } = useFormStore();
  const [formValues, setFormValues] = useState<Record<string, any>>({});
  const [visibleElements, setVisibleElements] = useState<FormElement[]>([]);

  // Reset values when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormValues({});
    }
  }, [isOpen]);

  // Calculate visibility whenever values or elements change
  useEffect(() => {
    const newVisibleElements = elements.filter((element) => {
      // If no rules, always show
      if (!element.visibilityRules || element.visibilityRules.length === 0) {
        return true;
      }

      // Check if ANY rule matches (OR logic)
      return element.visibilityRules.some((rule) => {
        const triggerValue = formValues[rule.fieldId];
        
        if (rule.operator === 'equals') {
          return String(triggerValue) === rule.value;
        } else if (rule.operator === 'notEquals') {
          return String(triggerValue) !== rule.value;
        }
        
        return false;
      });
    });

    setVisibleElements(newVisibleElements);
  }, [elements, formValues]);

  const handleInputChange = (id: string, value: any) => {
    setFormValues((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800">Form Preview</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-8">
          <form 
            className="flex flex-col gap-6" 
            onSubmit={(e) => {
              e.preventDefault();
              console.log('Form Data:', formValues);
              alert('Form Submitted! Check console for data.');
            }}
          >
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{metadata.title || 'Untitled Form'}</h1>
              {metadata.description && (
                <p className="text-gray-600 whitespace-pre-wrap">{metadata.description}</p>
              )}
            </div>

            {visibleElements.length === 0 ? (
              <p className="text-center text-gray-400 py-8">The form is empty or all elements are hidden.</p>
            ) : (
              visibleElements.map((element) => (
                <div key={element.id} onChange={(e: any) => {
                  // Capture changes from inputs
                  // Note: This is a simple delegation. For complex components, we might need a better controlled approach
                  // But for native inputs, this works because events bubble.
                  // We check if the target has a value or checked state
                  const target = e.target;
                  let value = target.value;
                  if (target.type === 'checkbox') {
                    value = target.checked;
                  }
                  handleInputChange(element.id, value);
                }}>
                  {renderField(element, true)}
                </div>
              ))
            )}
            
            {visibleElements.length > 0 && (
              <div className="mt-4">
                <button 
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  {metadata.submitLabel || 'Submit'}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
