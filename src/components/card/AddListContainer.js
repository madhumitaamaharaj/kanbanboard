import React from 'react';
import { Grid } from '@mui/material';
import AddList from './AddList';
import { useRecoilValue } from 'recoil';
import { newListNameState } from './atom';

const AddListContainer = () => {
  const newListName = useRecoilValue(newListNameState);

  return (
    <Grid item xs={4}>
      <AddList newListName={newListName} />
    </Grid>
  );
};

export default AddListContainer;
