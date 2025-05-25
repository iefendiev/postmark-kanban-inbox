import { useDroppable } from '@dnd-kit/core';
import { DroppableColumnProps } from './types';

export const DroppableColumn = ({ status, children }: DroppableColumnProps) => {
  const { setNodeRef } = useDroppable({ id: status });

  return (
    <div
      ref={setNodeRef}
      className="bg-muted rounded-lg p-2 h-full flex flex-col"
    >
      {children}
    </div>
  );
};
