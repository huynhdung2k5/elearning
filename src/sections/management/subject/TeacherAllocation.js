// proptype
import PropTypes from 'prop-types';
// react
import { useEffect, useState } from 'react';
// @mui
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Grid, Stack } from '@mui/material';
// redux
import { getBoard, persistCard, persistColumn } from '../../../redux/slices/kanbanStateSlice';
import { useDispatch, useSelector } from '../../../redux/store';
// utils
import { hideScrollbarX } from '../../../utils/cssStyles';
// components
import { SkeletonKanbanColumn } from '../../../components/skeleton';
// sections

// ----------------------------------------------------------------------

TeacherAllocation.propTypes = {
  teachers: PropTypes.array,
  subjects: PropTypes.array,
}; // proptype

// ----------------------------------------------------------------------

// fake data generator
const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}-${new Date().getTime()}`,
    content: `item ${k + offset}`,
  }));

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};
const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});
const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 250,
});

export default function TeacherAllocation({ teachers, subjects }) {
  const [state, setState] = useState([getItems(10), getItems(5, 10)]);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;
      setState(newState);
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setState(newState.filter((group) => group.length));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {subjects?.map((subject, index) => (
        <Droppable key={index} droppableId={`${index}`}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}
            >
              {subject?.teachers?.map((item, ind) => (
                <Draggable key={ind} draggableId={item.id} index={ind}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-around',
                        }}
                      >
                        {item.content}
                        <button
                          type="button"
                          onClick={() => {
                            const newState = [...state];
                            newState[ind].splice(index, 1);
                            setState(newState.filter((group) => group.length));
                          }}
                        >
                          delete
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      ))}
    </DragDropContext>
  );
}
