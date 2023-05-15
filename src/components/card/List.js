import React, { useEffect } from "react";
import { v4 as uuid } from "uuid"; // Import UUID library
import { StyledColumn } from "./StyledComponents";
import { useRecoilState } from "recoil";
import { addingTaskIndexState, newTaskNameState, listsState, cardDataState } from "./atom";
import { Typography, TextField, Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Navigate, json, useNavigate } from "react-router-dom";

const List = ({ list, listIndex }) => {
  const [addingTaskIndex, setAddingTaskIndex] =
  useRecoilState(addingTaskIndexState);
  const [newTaskName, setNewTaskName] = useRecoilState(newTaskNameState);
  const [lists, setLists] = useRecoilState(listsState);
  const navigate = useNavigate();
  const [, setCardData] = useRecoilState(cardDataState);

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
          tasks: [newTask, ...updatedLists[addingTaskIndex].tasks],
        };
        return updatedLists;
      });
      setNewTaskName("");
      setAddingTaskIndex(null);
    }
  };

  useEffect(() => {
    localStorage.setItem("Lists", JSON.stringify(lists));
  }, [lists]);

  const handleTaskClick = (task) => {
    setCardData((prevData) => ({
      ...prevData,
      taskName: 'Card Name',
    }));

    navigate(`/activity/${task.id}`); 
  };

  return (
    <StyledColumn>
      <div>
        <Typography variant="h6" gutterBottom>
          {list.name}
        </Typography>
        <div>
          {list.tasks.map((task, taskIndex) => (
            <StyledColumn className="task" key={taskIndex}>
              <div
                className="task"
                onClick={() => handleTaskClick(task)} 
              >
                {task.name}
              </div>
            </StyledColumn>
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
      </div>
    </StyledColumn>
  );
};

export default List;
