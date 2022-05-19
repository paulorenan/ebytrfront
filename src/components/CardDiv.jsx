import React, { useState, useEffect } from 'react'
import { Box, Button } from '@mui/material';
import axios from 'axios';
import TaskCard from './TaskCard';

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
        background: 'whitesmoke',
        borderRadius: '0.5rem',
        width: '100%',
        maxWidth: '30rem',
        padding: '1rem',
        margin: '0 auto',
        marginTop: '2rem',
        boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.2)',
      }}
    >
      <Button variant="contained">
        Adicionar tarefa
      </Button>
      {tasks.map(task => (
        <TaskCard
          key={task._id}
          task={task}
        />
      ))}
    </Box>
  )
}

export default CardDiv