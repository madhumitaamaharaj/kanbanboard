import React, { useEffect } from "react";
import { v4 as uuid } from "uuid";
import { StyledColumn } from "./StyledComponents";
import { useRecoilState } from "recoil";
import { addingTaskIndexState, newTaskNameState, listsState, cardDataState, listId, tasksIndex } from "./atom";
import { Typography, TextField, Button, IconButton, Popover } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import PopupState, { bindPopover, bindTrigger } from "material-ui-popup-state";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import styles from "./list.module.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const List = ({ list, listIndex }) => {
  console.log(list,listIndex)
  const [addingTaskIndex, setAddingTaskIndex] = useRecoilState(addingTaskIndexState);
  const [newTaskName, setNewTaskName] = useRecoilState(newTaskNameState);
  const [lists, setLists] = useRecoilState(listsState);
  const navigate = useNavigate();
  const [, setCardData] = useRecoilState(cardDataState);
  const [listid, setListsId] = useRecoilState(listId);
  const [, setTaskIndex] = useRecoilState(tasksIndex);

  const handleAddTask = () => {
    setAddingTaskIndex(listIndex);
  };

  const handleConfirmTask = () => {
    if (newTaskName) {
      setLists((prevLists) => {
        const updatedLists = [...prevLists];
        const newTask = {
          id: uuid(),
          name: newTaskName,
          description: "",
          activity: [],
        };
        updatedLists[addingTaskIndex] = {
          ...updatedLists[addingTaskIndex],
          tasks: [...updatedLists[addingTaskIndex].tasks, newTask],
        };
        return updatedLists;
      });
      setNewTaskName("");
      setAddingTaskIndex(null);
    }
  };

  const handleListDelete = (id) => {
    const filteredList = lists.filter((list) => list.id !== id);
    setLists(filteredList);
    localStorage.setItem("Lists", JSON.stringify(filteredList));
  };
  const handleCardDelete = (cardId) => {
    setLists((prevLists) => {
      const updatedLists = [...prevLists];
      const updatedTasks = updatedLists[listIndex].tasks.filter((task) => task.id !== cardId);
      updatedLists[listIndex] = {
        ...updatedLists[listIndex],
        tasks: updatedTasks,
      };
      return updatedLists;
    });
  };

  useEffect(() => {
    localStorage.setItem("Lists", JSON.stringify(lists));
  }, [lists]);

  const handleTaskClick = (task, response, taskIndex) => {
    setCardData((prevData) => ({
      ...prevData,
      taskName: "Card Name",
    }));
    setListsId(response);
    setTaskIndex(taskIndex);
    navigate(`/activity/${task.id}`);
  };

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    
    if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }
    setLists((prevLists) => {
      const updatedLists = [...prevLists];
      const sourceListIndex = updatedLists.findIndex((list) => list.id === source.droppableId);
      const destinationListIndex = updatedLists.findIndex((list) => list.id === destination.droppableId);
      const sourceList = { ...updatedLists[sourceListIndex] };
      const destinationList = { ...updatedLists[destinationListIndex] };
      const updatedSourceTasks = Array.from(sourceList.tasks);
      const [removed] = updatedSourceTasks.splice(source.index, 1);
      if (sourceListIndex === destinationListIndex) {
       
        updatedSourceTasks.splice(destination.index, 0, removed);
        sourceList.tasks = updatedSourceTasks;
        updatedLists[sourceListIndex] = sourceList;
      } else {
        
        const updatedDestinationTasks = Array.from(destinationList.tasks);
        updatedDestinationTasks.splice(destination.index, 0, removed);
        sourceList.tasks = updatedSourceTasks;
        destinationList.tasks = updatedDestinationTasks;
        updatedLists[sourceListIndex] = sourceList;
        updatedLists[destinationListIndex] = destinationList;
      }
      return updatedLists;
    });
  };
  


  return (
    <DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
      <Droppable droppableId={list.id}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <StyledColumn>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h6" style={{ marginRight: "10px" }}>
                  {list.name}
                </Typography>
                <div style={{ flex: 1 }}></div>
                <PopupState variant="popover" popupId="demo-popup-popover">
                  {(popupState) => (
                    <div>
                      <Button variant="contained" {...bindTrigger(popupState)}>
                        <MoreHorizIcon />
                      </Button>
                      <Popover
                        {...bindPopover(popupState)}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "center",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "center",
                        }}
                      >
                        <Typography sx={{ p: 2 }}>
                          <button onClick={() => handleListDelete(list.id)}>Delete</button>
                        </Typography>
                      </Popover>
                    </div>
                  )}
                </PopupState>
              </div>
              <div>
                {list.tasks.map((task, taskIndex) => (
                  <Draggable key={task.id} draggableId={task.id} index={taskIndex}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <StyledColumn className="task" key={taskIndex}>
                          <div
                            style={{ marginRight: "10px" }}
                            onClick={() => handleTaskClick(task, list.id, taskIndex)}
                          >
                            {task.name}
                          </div>
                          <div style={{ flex: 1 }}></div>
                          <PopupState variant="popover" popupId="demo-popup-popover">
                            {(popupState) => (
                              <div>
                                <Button variant="contained" {...bindTrigger(popupState)}>
                                  <MoreHorizIcon />
                                </Button>
                                <Popover
                                  {...bindPopover(popupState)}
                                  anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "center",
                                  }}
                                  transformOrigin={{
                                    vertical: "top",
                                    horizontal: "center",
                                  }}
                                >
                                  <Typography sx={{ p: 2 }}>
                                    <button onClick={() => handleCardDelete(task.id)}>
                                      Delete
                                    </button>
                                  </Typography>
                                </Popover>
                              </div>
                            )}
                          </PopupState>
                        </StyledColumn>
                      </div>
                    )}
                  </Draggable>
                ))}
              </div>
              {addingTaskIndex === listIndex ? (
                <div>
                  <div>
                    <TextField
                      label="Task Name"
                      value={newTaskName}
                      onChange={(e) => setNewTaskName(e.target.value)}
                      variant="filled"
                      size="small"
                      autoFocus
                    />
                  </div>
                  <div>
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={handleConfirmTask}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              ) : (
                <IconButton size="small" onClick={handleAddTask}>
                  + Add a card
                </IconButton>
              )}
            </StyledColumn>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
export default List;