import React, { useState } from 'react';
import { useFormStore } from '../store';
import { X, Plus, Trash, Settings, GitMerge } from 'lucide-react';
import type { VisibilityRule } from '../types';

export const PropertiesPanel: React.FC = () => {
  const { elements, selectedId, updateElement, selectElement, metadata, updateMetadata } = useFormStore();
  const selectedElement = elements.find((el) => el.id === selectedId);

  // Local state for the new rule form
  const [newRule, setNewRule] = useState<{ fieldId: string; operator: 'equals' | 'notEquals'; value: string }>({
    fieldId: '',
    operator: 'equals',
    value: ''
  });

  // Filter out the current element to avoid self-reference in logic
  const availableTriggerElements = elements.filter(
    (el) => el.id !== selectedId && (el.type === 'select' || el.type === 'checkbox' || el.type === 'text')
  );

  const selectedTriggerElement = elements.find(el => el.id === newRule.fieldId);

  if (!selectedElement) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
          <h2 className="font-semibold text-gray-800 flex items-center gap-2">
            <Settings size={18} />
            Form Settings
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
          {/* Form Title */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Form Title</label>
            <input
              type="text"
              value={metadata.title}
              onChange={(e) => updateMetadata({ title: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Contact Us"
            />
          </div>

          {/* Form Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={metadata.description}
              onChange={(e) => updateMetadata({ description: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
              placeholder="Enter a description for your form..."
            />
          </div>

          {/* Submit Button Label */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Submit Button Text</label>
            <input
              type="text"
              value={metadata.submitLabel}
              onChange={(e) => updateMetadata({ submitLabel: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Send Message"
            />
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-200 bg-gray-50 text-xs text-gray-500">
          Select an element on the canvas to edit its specific properties.
        </div>
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
        {/* Content/Label - For Inputs, Headers, and Paragraphs. Hidden for Separator */}
        {selectedElement.type !== 'separator' && (
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              {selectedElement.type === 'header' || selectedElement.type === 'paragraph' ? 'Text Content' : 'Label'}
            </label>
            {selectedElement.type === 'paragraph' ? (
              <textarea
                value={selectedElement.label}
                onChange={(e) => updateElement(selectedElement.id, { label: e.target.value })}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
              />
            ) : (
              <input
                type="text"
                value={selectedElement.label}
                onChange={(e) => updateElement(selectedElement.id, { label: e.target.value })}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>
        )}

        {/* Header Level - Only for Headers */}
        {selectedElement.type === 'header' && (
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Heading Level</label>
            <select
              value={selectedElement.subtype || 'h2'}
              onChange={(e) => updateElement(selectedElement.id, { subtype: e.target.value as any })}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="h1">Heading 1 (H1)</option>
              <option value="h2">Heading 2 (H2)</option>
              <option value="h3">Heading 3 (H3)</option>
            </select>
          </div>
        )}

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

        {/* Input Type (Subtype) - Only for text inputs */}
        {selectedElement.type === 'text' && (
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Input Type</label>
            <select
              value={selectedElement.subtype || 'text'}
              onChange={(e) => updateElement(selectedElement.id, { subtype: e.target.value as any })}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="text">Text</option>
              <option value="email">Email</option>
              <option value="tel">Phone</option>
              <option value="url">URL</option>
              <option value="password">Password</option>
            </select>
          </div>
        )}

        {/* Min/Max Length - For Text/Textarea */}
        {(selectedElement.type === 'text' || selectedElement.type === 'textarea') && (
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Min Length</label>
              <input
                type="number"
                value={selectedElement.minLength || ''}
                onChange={(e) => updateElement(selectedElement.id, { minLength: parseInt(e.target.value) || undefined })}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Max Length</label>
              <input
                type="number"
                value={selectedElement.maxLength || ''}
                onChange={(e) => updateElement(selectedElement.id, { maxLength: parseInt(e.target.value) || undefined })}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {/* Min/Max Value - For Number */}
        {selectedElement.type === 'number' && (
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Min Value</label>
              <input
                type="number"
                value={selectedElement.min || ''}
                onChange={(e) => updateElement(selectedElement.id, { min: parseInt(e.target.value) || undefined })}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Max Value</label>
              <input
                type="number"
                value={selectedElement.max || ''}
                onChange={(e) => updateElement(selectedElement.id, { max: parseInt(e.target.value) || undefined })}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}

        {/* Required Toggle - Not for static elements */}
        {(selectedElement.type !== 'header' && selectedElement.type !== 'paragraph' && selectedElement.type !== 'separator') && (
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
        )}

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

        {/* Conditional Logic */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex items-center gap-2 mb-4">
            <GitMerge size={18} className="text-purple-600" />
            <h3 className="font-semibold text-gray-800">Logic Rules</h3>
          </div>
          
          <div className="flex flex-col gap-3">
            {selectedElement.visibilityRules?.map((rule, index) => {
               const triggerElement = elements.find(el => el.id === rule.fieldId);
               return (
                <div key={index} className="bg-purple-50 p-3 rounded-lg border border-purple-100 flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-purple-700 uppercase">Show if...</span>
                    <button 
                       onClick={() => {
                         const newRules = selectedElement.visibilityRules?.filter((_, i) => i !== index);
                         updateElement(selectedElement.id, { visibilityRules: newRules });
                       }}
                       className="text-purple-400 hover:text-purple-700"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  
                  <div className="text-sm text-gray-700">
                    <span className="font-medium">"{triggerElement?.label || 'Unknown Field'}"</span>
                    <span className="mx-1 text-gray-400">{rule.operator === 'equals' ? 'is' : 'is not'}</span>
                    <span className="font-medium">"{rule.value}"</span>
                  </div>
                </div>
              );
            })}

            <div className="mt-2 p-3 border border-dashed border-gray-300 rounded-lg bg-gray-50">
              <p className="text-xs text-gray-500 mb-2 font-medium">Add New Condition</p>
              
              <div className="flex flex-col gap-2">
                 <select 
                   value={newRule.fieldId}
                   onChange={(e) => setNewRule({ ...newRule, fieldId: e.target.value, value: '' })} // Reset value on field change
                   className="w-full border border-gray-300 rounded p-1.5 text-xs bg-white"
                 >
                   <option value="">Select Trigger Field...</option>
                   {availableTriggerElements.map(el => (
                     <option key={el.id} value={el.id}>{el.label}</option>
                   ))}
                 </select>
                 
                 <select 
                    value={newRule.operator}
                    onChange={(e) => setNewRule({ ...newRule, operator: e.target.value as 'equals' | 'notEquals' })}
                    className="w-full border border-gray-300 rounded p-1.5 text-xs bg-white"
                 >
                   <option value="equals">Equals</option>
                   <option value="notEquals">Not Equals</option>
                 </select>

                 {selectedTriggerElement?.type === 'select' ? (
                   <select
                     value={newRule.value}
                     onChange={(e) => setNewRule({ ...newRule, value: e.target.value })}
                     className="w-full border border-gray-300 rounded p-1.5 text-xs bg-white"
                   >
                     <option value="">Select Value...</option>
                     {selectedTriggerElement.options?.map((option, idx) => (
                       <option key={idx} value={option}>{option}</option>
                     ))}
                   </select>
                 ) : selectedTriggerElement?.type === 'checkbox' ? (
                   <select
                     value={newRule.value}
                     onChange={(e) => setNewRule({ ...newRule, value: e.target.value })}
                     className="w-full border border-gray-300 rounded p-1.5 text-xs bg-white"
                   >
                     <option value="">Select Value...</option>
                     <option value="true">Checked</option>
                     <option value="false">Unchecked</option>
                   </select>
                 ) : (
                   <input 
                      type="text"
                      placeholder="Value to match..."
                      value={newRule.value}
                      onChange={(e) => setNewRule({ ...newRule, value: e.target.value })}
                      className="w-full border border-gray-300 rounded p-1.5 text-xs"
                   />
                 )}

                 <button
                    onClick={() => {
                      if (newRule.fieldId && newRule.value) {
                         const newRules = [...(selectedElement.visibilityRules || []), newRule];
                         updateElement(selectedElement.id, { visibilityRules: newRules });
                         
                         // Reset inputs
                         setNewRule({ fieldId: '', operator: 'equals', value: '' });
                      }
                    }}
                    disabled={!newRule.fieldId || !newRule.value}
                    className="w-full bg-white border border-blue-200 text-blue-600 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed text-xs font-medium py-1.5 rounded transition-colors"
                 >
                   Add Rule
                 </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-200 bg-gray-50 text-xs text-gray-500 font-mono break-all">
        ID: {selectedElement.id}
      </div>
    </div>
  );
};
