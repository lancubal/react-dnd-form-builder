export type FormElementType = 'text' | 'textarea' | 'number' | 'select' | 'checkbox';

export interface FormElement {
  id: string;
  type: FormElementType;
  label: string;
  required?: boolean;
  placeholder?: string;
  options?: string[]; // For select inputs
}

export interface FormState {
  elements: FormElement[];
  selectedId: string | null;
  addElement: (type: FormElementType) => void;
  removeElement: (id: string) => void;
  updateElement: (id: string, updates: Partial<FormElement>) => void;
  selectElement: (id: string | null) => void;
  moveElement: (oldIndex: number, newIndex: number) => void;
  setElements: (elements: FormElement[]) => void;
}
