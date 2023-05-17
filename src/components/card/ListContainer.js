import React from 'react';
import { Grid } from '@mui/material';
import { useRecoilValue } from 'recoil';
import List from './List';
import { addingTaskIndexState, newTaskNameState } from './atom';
import { DragDropContext } from 'react-beautiful-dnd';

const ListContainer = ({ lists }) => {
  const addingTaskIndex = useRecoilValue(addingTaskIndexState);
  const newTaskName = useRecoilValue(newTaskNameState);

  return (
    <DragDropContext>
    <>
      {lists.map((list, index) => (
        <Grid item xs={4} key={list.id}> 
          <List list={list} listIndex={index}  />
        </Grid>
      ))}
    </>
  </DragDropContext>
  );
};

export default ListContainer;



