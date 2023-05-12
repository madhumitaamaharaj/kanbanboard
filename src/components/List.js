import React from 'react';
import { StyledColumn } from './StyledComponents';
import { useRecoilState } from 'recoil';
import { addingTaskIndexState, newTaskNameState, listsState } from './atom';
import { Typography, TextField, Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const List = ({ list, listIndex }) => {
  const [addingTaskIndex, setAddingTaskIndex] = useRecoilState(addingTaskIndexState);
  const [newTaskName, setNewTaskName] = useRecoilState(newTaskNameState);
  const [lists, setLists] = useRecoilState(listsState);

  const handleAddTask = () => {
    setAddingTaskIndex(listIndex);
  };

  const handleConfirmTask = () => {
    if (newTaskName) {
      setLists((prevLists) => {
        const updatedLists = [...prevLists];
        updatedLists[addingTaskIndex] = {
          ...updatedLists[addingTaskIndex],
          tasks: [newTaskName, ...updatedLists[addingTaskIndex].tasks],
        };
        return updatedLists;
      });
      setNewTaskName('');
      setAddingTaskIndex(null);
    }
  };
  

  return (
    <StyledColumn>
      <div>
        <Typography variant="h6" gutterBottom>
          {list.name}
        </Typography>
        <div>
          {list.tasks.map((task, taskIndex) => (
            <StyledColumn className='task' key={taskIndex}>
              <div className="task">{task}</div>
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
              <Button variant="contained" startIcon={<AddIcon />} onClick={handleConfirmTask}>
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
