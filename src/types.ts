export type FormElementType = 'text' | 'textarea' | 'number' | 'select' | 'checkbox' | 'header' | 'paragraph' | 'separator';

export interface VisibilityRule {
  fieldId: string;
  operator: 'equals' | 'notEquals';
  value: string;
}

export interface FormElement {
  id: string;
  type: FormElementType;
  label: string;
  required?: boolean;
  placeholder?: string;
  options?: string[]; // For select inputs
  // Validation & Configuration
  subtype?: 'text' | 'email' | 'tel' | 'url' | 'password' | 'h1' | 'h2' | 'h3'; // Combined subtypes
  minLength?: number; // For text/textarea
  maxLength?: number; // For text/textarea
  min?: number; // For number inputs
  max?: number; // For number inputs
  // Conditional Logic
  visibilityRules?: VisibilityRule[];
}

export interface FormMetadata {
  title: string;
  description: string;
  submitLabel: string;
}

export interface FormState {
  elements: FormElement[];
  metadata: FormMetadata;
  selectedId: string | null;
  addElement: (type: FormElementType) => void;
  removeElement: (id: string) => void;
  updateElement: (id: string, updates: Partial<FormElement>) => void;
  selectElement: (id: string | null) => void;
  moveElement: (oldIndex: number, newIndex: number) => void;
  setElements: (elements: FormElement[]) => void;
  updateMetadata: (updates: Partial<FormMetadata>) => void;
}
