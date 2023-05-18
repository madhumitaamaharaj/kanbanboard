
import React from 'react';
import { Grid } from '@mui/material';
import { useRecoilValue } from 'recoil';
import ListContainer from './ListContainer';
import AddListContainer from './AddListContainer';
import { listsState } from './atom';
import Nav from '../layout/Layout';
import styles from "./Kanban.module.css"
import { template } from './atom';

  const KanbanUI = () => {
  const lists = useRecoilValue(listsState);
const wallpaper=useRecoilValue(template)

  return (
    < div className={styles.image} style={{backgroundImage:`url(${wallpaper})`}}>

      <Nav/>
    <Grid container spacing={1} className='main'>

      <ListContainer lists={lists} />
      <AddListContainer />
    </Grid>
    </div>
  );
};
export default KanbanUI