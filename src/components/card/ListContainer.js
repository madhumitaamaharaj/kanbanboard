import React from 'react';
import { Grid, Typography } from '@mui/material';
import { useRecoilState, useRecoilValue } from 'recoil';
import List from './List';
import { addingTaskIndexState, listsState, newTaskNameState } from './atom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { StyledBoard, StyledContainer } from './StyledComponents';

const ListContainer = () => {
  const [lists, setLists] = useRecoilState(listsState);
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const updatedLists = Array.from(lists);
    const sourceList = updatedLists.find((list) => list.id === source.droppableId);
    const destinationList = updatedLists.find((list) => list.id === destination.droppableId);

    const sourceTasks = Array.from(sourceList.tasks);
    const [removed] = sourceTasks.splice(source.index, 1);

    const updatedSourceList = {
      ...sourceList,
      tasks: sourceTasks,
    };

    const destinationTasks = Array.from(destinationList.tasks);
    destinationTasks.splice(destination.index, 0, removed);

    const updatedDestinationList = {
      ...destinationList,
      tasks: destinationTasks,
    };

    const sourceListIndex = updatedLists.findIndex((list) => list.id === source.droppableId);
    const destinationListIndex = updatedLists.findIndex((list) => list.id === destination.droppableId);

    updatedLists[sourceListIndex] = updatedSourceList;
    updatedLists[destinationListIndex] = updatedDestinationList;

    setLists(updatedLists);

    // Update local storage
    localStorage.setItem('Lists', JSON.stringify(updatedLists));
  };

  return (
    <StyledContainer>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="all-lists" direction="horizontal" type="list">
          {(provided) => (
            <StyledBoard {...provided.droppableProps} ref={provided.innerRef}>
              {lists.map((list, index) => (
                <List key={list.id} list={list} listIndex={index} />
              ))}
              {provided.placeholder}
            </StyledBoard>
          )}
        </Droppable>
      </DragDropContext>
    </StyledContainer>
  );
};

export default ListContainer;
