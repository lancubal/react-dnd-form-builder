import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useFormStore } from '../store';
import { FormElementWrapper } from './FormElementWrapper';

export const Canvas: React.FC = () => {
  const { elements, moveElement, selectElement, metadata } = useFormStore();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = elements.findIndex((el) => el.id === active.id);
      const newIndex = elements.findIndex((el) => el.id === over.id);
      moveElement(oldIndex, newIndex);
    }
  };

  return (
    <div 
      className="flex-1 bg-gray-100 p-8 overflow-y-auto flex justify-center"
      onClick={() => selectElement(null)} // Deselect when clicking canvas background
    >
      <div className="w-full max-w-2xl bg-white min-h-[calc(100vh-4rem)] shadow-lg rounded-xl flex flex-col">
        {/* Form Header */}
        <div className="p-8 border-b border-gray-100 bg-white rounded-t-xl" onClick={(e) => { e.stopPropagation(); selectElement(null); }}>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{metadata.title || 'Untitled Form'}</h1>
          {metadata.description && (
            <p className="text-gray-600 whitespace-pre-wrap">{metadata.description}</p>
          )}
        </div>

        <div className="p-8 flex-1">
          {elements.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-lg p-12">
              <p className="text-lg">Drag and drop elements from the sidebar</p>
            </div>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={elements.map(e => e.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="flex flex-col gap-4">
                  {elements.map((element) => (
                    <FormElementWrapper key={element.id} element={element} />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </div>
      </div>
    </div>
  );
};
