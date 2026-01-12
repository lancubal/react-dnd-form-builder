import React from 'react';
import type { FormElement } from '../../types';

interface Props {
  element: FormElement;
}

export const TextAreaField: React.FC<Props> = ({ element }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-medium text-gray-700">
        {element.label}
        {element.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24"
        placeholder={element.placeholder}
        disabled
      />
    </div>
  );
};
