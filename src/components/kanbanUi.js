import React, { useState } from 'react';
import { Grid, Paper, Typography, TextField, Button, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import "./kanbanUi.css"

const StyledColumn = styled(Paper)(({ theme }) => ({
    backgroundColor: '#f2f2f2',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    marginRight: theme.spacing(2),
    margin: theme.spacing(5),
}));

const KanbanUI = () => {
    const [lists, setLists] = useState([]);
    const [newListName, setNewListName] = useState('');
    const [showAddList, setShowAddList] = useState(false);
    const [newTaskName, setNewTaskName] = useState('');
    const [addingTaskIndex, setAddingTaskIndex] = useState(null);

    const handleAddList = () => {
        if (newListName) {
            const newList = {
                name: newListName,
                tasks: [],
            };
            setLists((prevLists) => [...prevLists, newList]);
            setNewListName('');
            setShowAddList(false);
        }
    };

    const handleAddTask = (listIndex) => {
        setAddingTaskIndex(listIndex);
    };

    const handleConfirmTask = () => {
        if (newTaskName) {
            const updatedLists = [...lists];
            updatedLists[addingTaskIndex].tasks.unshift(newTaskName); 
            setLists(updatedLists);
            setNewTaskName('');
            setAddingTaskIndex(null);
        }
    };

    return (
        <Grid container spacing={1} className='main'>
            {lists.map((list, index) => (
                <Grid item xs={4} key={index}>
                    <StyledColumn>

                        <div >
                            <Typography variant="h6" gutterBottom>
                                {list.name}
                            </Typography>
                            <div>
                                
                            
                            {list.tasks.map((task, taskIndex) => (
                                <StyledColumn className='task'>
                                <div className="task" key={taskIndex}>
                                    {task}
                                </div>
                                </StyledColumn>
                            ))}
                              
                            </div>
                            {addingTaskIndex === index ? (
                                <div>
                                    <div >
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
                                <IconButton size="small" onClick={() => handleAddTask(index)}>
                                    + Add a card
                                </IconButton>
                            )}
                        </div>

                    </StyledColumn>
                </Grid>
            ))}
            {showAddList && (
                <Grid item xs={4}>
                    <StyledColumn>
                        <div >
                            <TextField
                                label="List Name"
                                value={newListName}
                                onChange={(e) => setNewListName(e.target.value)}
                                variant="filled"
                                size="small"
                            />
                        </div>
                        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddList}>
                            Add List
                        </Button>
                        <IconButton size="small" onClick={() => setShowAddList(false)}>
                            <CloseIcon />
                        </IconButton>
                    </StyledColumn>
                </Grid>
            )}
            {!showAddList && (
                <Grid item xs={4}>
                    <StyledColumn>
                        <div className="add-list-button">
                            <Button variant="contained" startIcon={<AddIcon />} onClick={() => setShowAddList(true)}>
                                Add a list
                            </Button>
                        </div>
                    </StyledColumn>
                </Grid>
            )}
        </Grid>
    );
};

export default KanbanUI;

