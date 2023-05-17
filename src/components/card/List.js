import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { StyledColumn } from "./StyledComponents"; 
import { useRecoilState } from "recoil";

import {
  addingTaskIndexState,
  newTaskNameState,
  listsState,
  cardDataState,
  listId,
  tasksIndex,
} from "./atom";
import { Typography, TextField, Button, IconButton, Popover } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import PopupState, { bindPopover, bindTrigger } from "material-ui-popup-state";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import styles from "./list.module.css";
import { Draggable, Droppable } from "react-beautiful-dnd";

const List = ({ list, listIndex }) => {
  const [addingTaskIndex, setAddingTaskIndex] = useRecoilState(addingTaskIndexState);
  const [newTaskName, setNewTaskName] = useRecoilState(newTaskNameState);
  const [lists, setLists] = useRecoilState(listsState);
  const navigate = useNavigate();
  const [, setCardData] = useRecoilState(cardDataState);
  const [, setListsId] = useRecoilState(listId);
  const [, setTaskIndex] = useRecoilState(tasksIndex);
  const [editingTaskId, setEditingTaskId] = useState(null);

  const handleAddTask = () => {
    setAddingTaskIndex(listIndex);
    setEditingTaskId(null);
    setNewTaskName("");
  };

  const handleConfirmTask = () => {
    if (newTaskName) {
      setLists((prevLists) => {
        const updatedLists = [...prevLists];
        const newTask = {
          id: editingTaskId || uuid(),
          name: newTaskName,
          description: "",
          activity: [],
        };
        if (editingTaskId) {
          const existingTaskIndex = updatedLists[addingTaskIndex].tasks.findIndex((task) => task.id === editingTaskId);
          if (existingTaskIndex !== -1) {
            updatedLists[addingTaskIndex] = {
              ...updatedLists[addingTaskIndex],
              tasks: [
                ...updatedLists[addingTaskIndex].tasks.slice(0, existingTaskIndex),
                newTask,
                ...updatedLists[addingTaskIndex].tasks.slice(existingTaskIndex + 1),
              ],
            };
          }
        } else {
          updatedLists[addingTaskIndex] = {
            ...updatedLists[addingTaskIndex],
            tasks: [...updatedLists[addingTaskIndex].tasks, newTask],
          };
        }
        return updatedLists;
      });
      setNewTaskName("");
      setAddingTaskIndex(null);
      setEditingTaskId(null);
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
      updatedLists[listIndex] = { ...updatedLists[listIndex], tasks: updatedTasks };
      return updatedLists;
    });
    localStorage.setItem("Lists", JSON.stringify(lists));
  };

 

  useEffect(() => {
    if (listIndex === addingTaskIndex) {
      const newTaskInput = document.getElementById(`new-task-input-${listIndex}`);
      if (newTaskInput) {
        newTaskInput.focus();
      }
    }
  }, [listIndex, addingTaskIndex]);

  const handleTaskEdit = (taskId) => {
    setNewTaskName(lists[listIndex].tasks.find((task) => task.id === taskId).name);
    setEditingTaskId(taskId);
    setAddingTaskIndex(listIndex);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    setLists((prevLists) => {
      const updatedLists = [...prevLists];
      const sourceList = updatedLists[source.droppableId];
      const destinationList = updatedLists[destination.droppableId];
      const sourceTasks = [...sourceList.tasks];
      const destinationTasks = [...destinationList.tasks];
      const [removed] = sourceTasks.splice(source.index, 1);
      destinationTasks.splice(destination.index, 0, removed);

      updatedLists[source.droppableId] = { ...sourceList, tasks: sourceTasks };
      updatedLists[destination.droppableId] = { ...destinationList, tasks: destinationTasks };

      return updatedLists;
    });
  };

  return (
    <Draggable draggableId={String(list.id)} index={listIndex}>
      {(provided) => (
        <StyledColumn
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          key={list.id}
          className={styles.column}
        >
          <div className={styles.columnHeader}>
            <Typography variant="h6" gutterBottom>
              {list.name}
            </Typography>
            <PopupState variant="popover" popupId="demo-popup-popover">
              {(popupState) => (
                <div>
                  <IconButton
                    size="small"
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    {...bindTrigger(popupState)}
                  >
                    <MoreHorizIcon />
                  </IconButton>
                  <Popover
                    {...bindPopover(popupState)}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                  >
                    <div className={styles.popover}>
                      <IconButton
                        size="small"
                        color="error"
                        aria-label="delete list"
                        onClick={() => handleListDelete(list.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </div>
                  </Popover>
                </div>
              )}
            </PopupState>
          </div>
          <Droppable droppableId={String(list.id)}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {list.tasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                    {(provided) => (
                      <div
                        className={styles.task}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Typography variant="body1" gutterBottom>
                          {task.name}
                        </Typography>
                        <div className={styles.taskButtons}>
                          <IconButton
                            size="small"
                            aria-label="edit task"
                            onClick={() => handleTaskEdit(task.id)}
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            aria-label="delete task"
                            onClick={() => handleCardDelete(task.id)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                {listIndex === addingTaskIndex && (
                  <div className={styles.newTask}>
                    <TextField
                      id={`new-task-input-${listIndex}`}
                      label="New Task"
                      variant="outlined"
                      size="small"
                      value={newTaskName}
                      onChange={(e) => setNewTaskName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleConfirmTask();
                        }
                      }}
                    />
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<AddIcon />}
                      onClick={handleConfirmTask}
                    >
                      Add Task
                    </Button>
                  </div>
                )}
              </div>
            )}
          </Droppable>
          {!addingTaskIndex && (
            <div className={styles.addTaskButton}>
              <Button variant="outlined" size="small" onClick={handleAddTask}>
                + Add a task
              </Button>
            </div>
          )}
        </StyledColumn>
      )}
    </Draggable>
  );
};

export default List;
