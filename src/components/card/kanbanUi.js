import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { listsState, cardDataState, listId, tasksIndex, newListNameState, showAddListState } from "./atom";
import { v4 as uuid } from "uuid";
import { Typography, Container, Button, IconButton, Grid, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import List from "./List";
import { StyledBoard, StyledColumn, StyledContainer } from "./StyledComponents";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

const KanbanUI = () => {
 
  const [, setCardData] = useRecoilState(cardDataState);
  const [, setListsId] = useRecoilState(listId);
  const [, setTaskIndex] = useRecoilState(tasksIndex);
  const [newListName, setNewListName] = useRecoilState(newListNameState);
  const [showAddList, setShowAddList] = useRecoilState(showAddListState);
  const [listsid, setlistsId] = useRecoilState(listId);
  const [lists, setLists] = useRecoilState(listsState);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
  
    const { source, destination } = result;
  
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }
  
    setLists((prevLists) => {
      const updatedLists = [...prevLists];
      const sourceListIndex = updatedLists.findIndex((list) => list.id === source.droppableId);
      const destinationListIndex = updatedLists.findIndex((list) => list.id === destination.droppableId);
  
      const sourceList = updatedLists[sourceListIndex];
      const destinationList = updatedLists[destinationListIndex];
  
      const sourceTasks = [...sourceList.tasks];
      const [removed] = sourceTasks.splice(source.index, 1);
  
      const updatedSourceList = {
        ...sourceList,
        tasks: sourceTasks,
      };
  
      const updatedDestinationList = {
        ...destinationList,
        tasks: [
          ...destinationList.tasks.slice(0, destination.index),
          removed,
          ...destinationList.tasks.slice(destination.index),
        ],
      };
  
      updatedLists[sourceListIndex] = updatedSourceList;
      updatedLists[destinationListIndex] = updatedDestinationList;
  
      return updatedLists;
    });
  };
  
  
  const storedList = JSON.parse(localStorage.getItem("Lists"));
  useEffect(() => {
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
      localStorage.setItem("Lists", JSON.stringify([...lists, newList]));
      setLists((prevLists) => [...prevLists, newList]);
      setNewListName("");
      setShowAddList(false);
    }
  };

  return (
    <StyledContainer>
      <Typography variant="h4" gutterBottom>
        Kanban Board
      </Typography>
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="all-lists" direction="horizontal" type="list">
          {(provided) => (
            <StyledBoard {...provided.droppableProps} ref={provided.innerRef}>
              {lists.map((list, index) => (
                <List key={list.id} list={list} listIndex={index} />
              ))}
              {provided.placeholder}
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
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddList}
            >
              Add List
            </Button>
            <IconButton size="small" onClick={() => setShowAddList(false)}>
              <CloseIcon />
            </IconButton>
          </StyledColumn>
        </Grid>
      ) : (
        <Grid item xs={12}>
          <StyledColumn>
            <div className="add-list-button">
              <Button
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
            </StyledBoard>
          )}
        </Droppable>
      </DragDropContext>
    </StyledContainer>
  );
};

export default KanbanUI;
