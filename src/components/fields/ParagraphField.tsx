import React from 'react';
import type { FormElement } from '../../types';

interface Props {
  element: FormElement;
}

export const ParagraphField: React.FC<Props> = ({ element }) => {
  return (
    <div className="w-full">
      <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">
        {element.label}
      </p>
    </div>
  );
};
