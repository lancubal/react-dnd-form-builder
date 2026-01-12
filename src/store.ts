import { create } from 'zustand';
import { arrayMove } from '@dnd-kit/sortable';
import { nanoid } from 'nanoid';
import type { FormState, FormElementType, FormMetadata } from './types';

export const useFormStore = create<FormState>((set) => ({
  elements: [],
  metadata: {
    title: 'Untitled Form',
    description: '',
    submitLabel: 'Submit',
  },
  selectedId: null,

  addElement: (type: FormElementType) =>
    set((state) => {
      const newElement = {
        id: nanoid(),
        type,
        label: type === 'checkbox' ? 'New Checkbox' : `New ${type} input`,
        placeholder: type === 'text' || type === 'textarea' ? 'Placeholder...' : undefined,
        required: false,
        options: type === 'select' ? ['Option 1', 'Option 2'] : undefined,
        subtype: type === 'text' ? 'text' : undefined,
      };
      return { 
        elements: [...state.elements, newElement],
        selectedId: newElement.id 
      };
    }),

  removeElement: (id: string) =>
    set((state) => ({
      elements: state.elements.filter((el) => el.id !== id),
      selectedId: state.selectedId === id ? null : state.selectedId,
    })),

  updateElement: (id: string, updates) =>
    set((state) => ({
      elements: state.elements.map((el) =>
        el.id === id ? { ...el, ...updates } : el
      ),
    })),

  selectElement: (id: string | null) =>
    set(() => ({ selectedId: id })),

  moveElement: (oldIndex: number, newIndex: number) =>
    set((state) => ({
      elements: arrayMove(state.elements, oldIndex, newIndex),
    })),
    
  setElements: (elements) => set({ elements }),

  updateMetadata: (updates) =>
    set((state) => ({
      metadata: { ...state.metadata, ...updates },
    })),
}));
