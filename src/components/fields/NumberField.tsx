import React from 'react';
import type { FormElement } from '../../types';

interface Props {
  element: FormElement;
  isPreview?: boolean;
}

export const NumberField: React.FC<Props> = ({ element, isPreview }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-medium text-gray-700">
        {element.label}
        {element.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type="number"
        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={element.placeholder}
        disabled={!isPreview}
        required={element.required}
        min={element.min}
        max={element.max}
      />
    </div>
  );
};
