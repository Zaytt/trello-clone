import { useRef } from 'react';
import AddNewItem from './AddNewItem';
import Card from './Card';
import { useDrop } from 'react-dnd';
import { ColumnContainer, ColumnTitle } from '../styles/styles';
import { useAppState } from '../context/AppStateContext';
import { useItemDrag } from '../utils/useItemDrag';
import { DragItem } from '../utils/DragItem';
import { isHidden } from '../utils/isHidden';

interface ColumnProps {
  isPreview: boolean;
  text: string;
  index: number;
  id: string;
}

const Column = ({ text, index, id, isPreview }: ColumnProps) => {
  const { state, dispatch } = useAppState();
  const ref = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: 'COLUMN',
    hover(item: DragItem) {
      if (item.type === 'COLUMN') {
        // index of the column being dragged
        const dragIndex = item.index;
        // index of the column being hovered
        const hoverIndex = index;

        if (dragIndex === hoverIndex) {
          return;
        }

        dispatch({ type: 'MOVE_LIST', payload: { dragIndex, hoverIndex } });
        item.index = hoverIndex;
      }
    },
  });

  const { drag } = useItemDrag({ type: 'COLUMN', id, index, text });

  drag(drop(ref));

  return (
    <ColumnContainer
      isPreview={isPreview}
      ref={ref}
      isHidden={isHidden(isPreview, state.draggedItem, 'COLUMN', id)}
    >
      <ColumnTitle>{text}</ColumnTitle>
      {state.lists[index].tasks.map((task, i) => (
        <Card
          id={task.id}
          isPreview={false}
          text={task.text}
          key={task.id}
          index={i}
          columnId={id}
        />
      ))}
      <AddNewItem
        toggleButtonText="+ Add another card"
        onAdd={(text) => dispatch({ type: 'ADD_TASK', payload: { text, listId: id } })}
        dark
      />
    </ColumnContainer>
  );
};

export default Column;
