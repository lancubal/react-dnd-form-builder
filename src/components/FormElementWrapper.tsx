import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { FormElement } from '../types';
import { renderField } from './FieldRegistry';
import { useFormStore } from '../store';
import { Trash2, GripVertical, GitMerge } from 'lucide-react';
import cn from 'classnames';

interface Props {
  element: FormElement;
}

export const FormElementWrapper: React.FC<Props> = ({ element }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: element.id });

  const { selectElement, removeElement, selectedId } = useFormStore();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isSelected = selectedId === element.id;
  const hasConditions = element.visibilityRules && element.visibilityRules.length > 0;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'relative group flex items-start gap-2 p-4 rounded-lg border-2 bg-white transition-colors cursor-pointer',
        isSelected ? 'border-blue-500 ring-1 ring-blue-500' : 'border-transparent hover:border-gray-200',
        isDragging && 'opacity-50 z-50'
      )}
      onClick={(e) => {
        e.stopPropagation();
        selectElement(element.id);
      }}
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="mt-1 p-1 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <GripVertical size={20} />
      </div>

      {/* Field Content */}
      <div className="flex-1 pointer-events-none">
        {renderField(element)}
      </div>

      {/* Indicators & Actions */}
      <div className="absolute right-3 top-3 flex gap-2">
         {hasConditions && (
           <div className="p-1.5 bg-purple-100 text-purple-600 rounded-md" title="Has conditional logic">
             <GitMerge size={16} />
           </div>
         )}
      </div>

      {/* Delete Action */}
      {isSelected && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            removeElement(element.id);
          }}
          className="absolute -right-3 -top-3 p-1.5 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition-colors"
          title="Delete"
        >
          <Trash2 size={16} />
        </button>
      )}
    </div>
  );
};
