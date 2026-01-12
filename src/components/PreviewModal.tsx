import React from 'react';
import { useFormStore } from '../store';
import { renderField } from './FieldRegistry';
import { X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const PreviewModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { elements, metadata } = useFormStore();

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
          <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{metadata.title || 'Untitled Form'}</h1>
              {metadata.description && (
                <p className="text-gray-600 whitespace-pre-wrap">{metadata.description}</p>
              )}
            </div>

            {elements.length === 0 ? (
              <p className="text-center text-gray-400 py-8">The form is empty.</p>
            ) : (
              elements.map((element) => (
                <div key={element.id}>
                  {renderField(element, true)}
                </div>
              ))
            )}
            
            {elements.length > 0 && (
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
