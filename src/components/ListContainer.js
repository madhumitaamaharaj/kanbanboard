import React from 'react';
import { Grid } from '@mui/material';
import { useRecoilValue } from 'recoil';
import List from './List';
import { addingTaskIndexState, newTaskNameState } from './atom';

const ListContainer = ({ lists }) => {
  const addingTaskIndex = useRecoilValue(addingTaskIndexState);
  const newTaskName = useRecoilValue(newTaskNameState);

  return (
    <>
      {lists.map((list, index) => (
        <Grid item xs={4} key={index}>
          <List list={list} listIndex={index} addingTaskIndex={addingTaskIndex} newTaskName={newTaskName} />
        </Grid>
      ))}
    </>
  );
};

export default ListContainer;
