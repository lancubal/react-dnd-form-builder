import React from 'react';
import type { FormElement, FormElementType } from '../types';
import { TextField } from './fields/TextField';
import { TextAreaField } from './fields/TextAreaField';
import { NumberField } from './fields/NumberField';
import { SelectField } from './fields/SelectField';
import { CheckboxField } from './fields/CheckboxField';

const fieldComponents: Record<FormElementType, React.FC<{ element: FormElement; isPreview?: boolean }>> = {
  text: TextField,
  textarea: TextAreaField,
  number: NumberField,
  select: SelectField,
  checkbox: CheckboxField,
};

export const renderField = (element: FormElement, isPreview: boolean = false) => {
  const Component = fieldComponents[element.type];
  if (!Component) return null;
  return <Component element={element} isPreview={isPreview} />;
};
