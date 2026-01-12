import React from 'react';
import type { FormElement } from '../../types';

interface Props {
  element: FormElement;
}

export const CheckboxField: React.FC<Props> = ({ element }) => {
  return (
    <div className="flex items-center gap-2 w-full">
      <input
        type="checkbox"
        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        disabled
      />
      <label className="text-sm font-medium text-gray-700">
        {element.label}
        {element.required && <span className="text-red-500 ml-1">*</span>}
      </label>
    </div>
  );
};
