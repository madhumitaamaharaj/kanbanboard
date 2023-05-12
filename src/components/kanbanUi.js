import React from 'react';
import { Grid } from '@mui/material';
import { useRecoilValue } from 'recoil';
import ListContainer from './ListContainer';
import AddListContainer from './AddListContainer';
import { listsState } from './atom';

const KanbanUI = () => {
  const lists = useRecoilValue(listsState);
 

  return (
    <Grid container spacing={1} className='main'>
      <ListContainer lists={lists} />
      <AddListContainer />
    </Grid>
  );
};

export default KanbanUI;
