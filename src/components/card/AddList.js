import React, { useState, useEffect } from "react";
import { Grid, Button, IconButton, TextField } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import { newListNameState, showAddListState, listsState, listId } from "./atom";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { v4 as uuid } from "uuid";
import { StyledColumn } from "./StyledComponents";
import styles from "./AddList.module.css"
const AddList = () => {
  const [newListName, setNewListName] = useRecoilState(newListNameState);
  const [showAddList, setShowAddList] = useRecoilState(showAddListState);
  const [listid, setListId] = useRecoilState(listId);
  const [lists, setLists] = useRecoilState(listsState);

  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem("Lists"));
    if (storedList) {
      setLists(storedList);
    }
  }, []);

  const handleAddList = () => {
    if (newListName) {
      const newList = {
        id: uuid(),
        name: newListName,
        tasks: [],
      };
      setLists((prevLists) => [...prevLists, newList]);
      setNewListName("");
      setShowAddList(false);
      setListId(newList.id);
      localStorage.setItem("Lists", JSON.stringify([...lists, newList]));
    }
  };

  return (
    <Grid container spacing={4} className="main">
      {showAddList ? (
        <Grid item xs={12}>
          <StyledColumn>
            <div>
              <TextField
                label="List Name"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                variant="filled"
                size="small"
              />
            </div>
            <Button className={styles.addlist} variant="contained" startIcon={<AddIcon />} onClick={handleAddList}>
              Add List
            </Button>
            <IconButton className={styles.close} size="small" onClick={() => setShowAddList(false)}>
              <CloseIcon />
            </IconButton>
          </StyledColumn>
        </Grid>
      ) : (
        <Grid item xs={10}>
          <StyledColumn>
            <div >
              <Button
              className={styles.addlists}
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setShowAddList(true)}
              >
                Add a list
              </Button>
            </div>
          </StyledColumn>
        </Grid>
      )}
    </Grid>
  );
};

export default AddList;
