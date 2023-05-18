import React from 'react';
import { Grid, Typography } from '@mui/material';
import { useRecoilState, useRecoilValue } from 'recoil';
import List from './List';
import { addingTaskIndexState, listsState, newTaskNameState } from './atom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { StyledBoard, StyledContainer } from './StyledComponents';

const ListContainer = () => {
  const [lists, setLists] = useRecoilState(listsState);


  const handleDragEnd = (results) => {
    
    const { source, destination, type } = results;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "group") {
      const reorderedStores = [...lists];

      const storeSourceIndex = source.index;
      const storeDestinatonIndex = destination.index;

      const [removedStore] = reorderedStores.splice(storeSourceIndex, 1);
      reorderedStores.splice(storeDestinatonIndex, 0, removedStore);
      localStorage.setItem("List", JSON.stringify(reorderedStores));

      return setLists(reorderedStores);
    }
    const itemSourceIndex = source.index;
    const itemDestinationIndex = destination.index;

    const storeSourceIndex = lists.findIndex(
      (list) => list.id === source.droppableId
    );
    const storeDestinationIndex = lists.findIndex(
      (list) => list.id === destination.droppableId
    );

    const newSourceItems = [...lists[storeSourceIndex].tasks];
    const newDestinationItems =
      source.droppableId !== destination.droppableId
        ? [...lists[storeDestinationIndex].tasks]
        : newSourceItems;

    const [deletedItem] = newSourceItems.splice(itemSourceIndex, 1);
    newDestinationItems.splice(itemDestinationIndex, 0, deletedItem);

    const newStores = [...lists];

    newStores[storeSourceIndex] = {
      ...lists[storeSourceIndex],
      tasks: newSourceItems,
    };
    newStores[storeDestinationIndex] = {
      ...lists[storeDestinationIndex],
      tasks: newDestinationItems,
    };

    setLists(newStores);
    localStorage.setItem("Lists", JSON.stringify(newStores));
  };
  return (
    <div>
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="all-lists" direction="horizontal" type="list">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{ display: 'flex' }} // Added style to make it horizontal
          >
            {lists.map((list, index) => (
              <List key={list.id} list={list} listIndex={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  </div>
  );
};

export default ListContainer;
