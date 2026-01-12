import React from 'react';
import type { FormElement } from '../../types';

interface Props {
  element: FormElement;
}

export const HeaderField: React.FC<Props> = ({ element }) => {
  const Tag = (element.subtype as 'h1' | 'h2' | 'h3') || 'h2';
  
  const styles = {
    h1: "text-3xl font-bold text-gray-900 mb-2",
    h2: "text-2xl font-semibold text-gray-800 mb-2",
    h3: "text-xl font-medium text-gray-800 mb-1"
  };

  return (
    <div className="w-full">
      <Tag className={styles[Tag]}>
        {element.label}
      </Tag>
    </div>
  );
};
