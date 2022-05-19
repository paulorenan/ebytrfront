import React, { useState, useEffect } from 'react'
import { Box, Button } from '@mui/material';
import axios from 'axios';
import TaskCard from './TaskCard';
import AddTask from './AddTask';

function CardDiv() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('https://ebytrback.herokuapp.com/tasks').then(res => {
      setTasks(res.data);
    });
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: '0.5rem',
        width: '99%',
        maxWidth: '70rem',
        minWidth: '50px',
        padding: '1rem',
        marginTop: '1rem',
      }}
    >
      <AddTask />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          width: '100%',
        }}
      >
        {tasks.map(task => (
          <TaskCard
            key={task._id}
            task={task}
          />
        ))}
      </Box>
    </Box>
  )
}

export default CardDiv