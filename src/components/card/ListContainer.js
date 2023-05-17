import React from 'react';
import { Grid } from '@mui/material';

import List from './List';
import { useRecoilState } from 'recoil';
import { listsState } from './atom';
import { Droppable } from 'react-beautiful-dnd';


const ListContainer = () => {
  const [lists, setLists] = useRecoilState(listsState);

  return (
    <Grid container spacing={2}>
      {lists.map((list, index) => (
        <Droppable key={list.id} droppableId={list.id} >
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <Grid item xs={4} key={list.id}>
                <List list={list} listIndex={index} />
              </Grid>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      ))}
    </Grid>
  )
};

export default ListContainer;



