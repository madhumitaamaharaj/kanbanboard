import React, { useEffect } from "react";
import { v4 as uuid } from "uuid";
import { StyledColumn } from "./StyledComponents";
import { useRecoilState } from "recoil";
import { addingTaskIndexState, newTaskNameState, listsState, cardDataState, listid, tasksIndex } from "./atom";
import { Typography, TextField, Button, IconButton, Popover } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import PopupState, { bindPopover, bindTrigger } from "material-ui-popup-state";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import styles from "./list.module.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import CloseIcon from '@material-ui/icons/Close';

const List = () => {
  const [addingTaskIndex, setAddingTaskIndex] = useRecoilState(addingTaskIndexState);
  const [newTaskName, setNewTaskName] = useRecoilState(newTaskNameState);
  const [lists, setLists] = useRecoilState(listsState);
  const navigate = useNavigate();
  const [, setCardData] = useRecoilState(cardDataState);
  const [listId, setListId] = useRecoilState(listid);
  const [, setTasksIndex] = useRecoilState(tasksIndex);

  const handleAddTask = (listIndex) => {
    setAddingTaskIndex(listIndex);
  };

  const handleConfirmTask = (listIndex) => {
    if (newTaskName) {
      setLists((prevLists) => {
        const updatedLists = [...prevLists];
        const newTask = {
          id: uuid(),
          name: newTaskName,
          description: "",
          activity: [],
        };
        updatedLists[listIndex] = {
          ...updatedLists[listIndex],
          tasks: [...updatedLists[listIndex].tasks, newTask],
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

  const handleCardDelete = (listIndex, cardId) => {
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

  const handleTaskClick = (task, listIndex, taskIndex) => {
    setCardData((prevData) => ({
      ...prevData,
      taskName: "Card Name",
    }));
    setListId(listIndex);
    setTasksIndex(taskIndex);
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
    const sourceListIndex = updatedLists.findIndex(list => `list-${list.id}` === source.droppableId);
    const destinationListIndex = updatedLists.findIndex(list => `list-${list.id}` === destination.droppableId);
    const sourceList = updatedLists[sourceListIndex];
    const destinationList = updatedLists[destinationListIndex];
    const [removed] = sourceList.tasks.splice(source.index, 1);
    destinationList.tasks.splice(destination.index, 0, removed);
    return updatedLists;
  });
};


  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="list">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {lists.map((list, listIndex) => (
                <Draggable key={list.id} draggableId={list.id.toString()} index={listIndex}>
                  {(provided) => (
                    <StyledColumn
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                    >
                      <div className={styles.header}>
                        <Typography variant="h6" className={styles.title}>
                          {list.name}
                        </Typography>
                        <PopupState variant="popover" popupId="demo-popup-popover">
                          {(popupState) => (
                            <div>
                              <IconButton {...bindTrigger(popupState)}>
                                <MoreHorizIcon />
                              </IconButton>
                              <Popover {...bindPopover(popupState)}>
                                <Typography sx={{ p: 2 }}>
                                  <Button
                                    onClick={() => handleListDelete(list.id)}
                                    variant="outlined"
                                    color="error"
                                  >
                                    Delete List
                                  </Button>
                                </Typography>
                              </Popover>
                            </div>
                          )}
                        </PopupState>
                      </div>
                      <Droppable droppableId={`list-${list.id}`} key={list.id}>
                        {(provided) => (
                          <div {...provided.droppableProps} ref={provided.innerRef}>
                            {list.tasks.map((task, taskIndex) => (
                              <Draggable
                                key={task.id}
                                draggableId={task.id.toString()}
                                index={taskIndex}
                              >
                                {(provided) => (
                                  <div
                                    className={styles.taskContainer}
                                    {...provided.draggableProps}
                                    ref={provided.innerRef}
                                  >
                                    <Typography
                                      className={styles.taskName}
                                      variant="body1"
                                      onClick={() => handleTaskClick(task, listIndex, taskIndex)}
                                    >
                                      {task.name}
                                    </Typography>
                                    <IconButton
                                      onClick={() => handleCardDelete(listIndex, task.id)}
                                    >
                                      <CloseIcon />
                                    </IconButton>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                      {addingTaskIndex === listIndex ? (
                        <div className={styles.newTaskContainer}>
                          <TextField
                            label="New Task"
                            value={newTaskName}
                            onChange={(e) => setNewTaskName(e.target.value)}
                            fullWidth
                          />
                          <div className={styles.buttons}>
                            <Button
                              onClick={() => handleConfirmTask(listIndex)}
                              variant="contained"
                              color="primary"
                              size="small"
                              className={styles.confirmButton}
                            >
                              Confirm
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <Button
                          onClick={() => handleAddTask(listIndex)}
                          startIcon={<AddIcon />}
                          fullWidth
                          variant="outlined"
                          color="primary"
                          size="small"
                        >
                          Add Task
                        </Button>
                      )}
                    </StyledColumn>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
  
};

export default List;
