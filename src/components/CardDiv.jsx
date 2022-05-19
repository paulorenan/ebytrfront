import React, { useState, useEffect } from 'react'
import { Box, Button, Typography } from '@mui/material';
import axios from 'axios';
import TaskCard from './TaskCard';
import AddTask from './AddTask';

function CardDiv() {
  const [tasks, setTasks] = useState([]);
  const [orderAlpha, setOrderAlpha] = useState(false);

  useEffect(() => {
    axios.get('https://ebytrback.herokuapp.com/tasks').then(res => {
      setTasks(res.data);
    });
  }, []);

  const fetchTasks = () => {
    axios.get('https://ebytrback.herokuapp.com/tasks').then(res => {
      setTasks(res.data);
    });
  };

  const ordenarAlphabet = () => {
    if (!orderAlpha) {
      setTasks(tasks.sort((a, b) => a.title.localeCompare(b.title)));
    } else {
      setTasks(tasks.sort((a, b) => a.title.localeCompare(b.title)).reverse());
    }
    setOrderAlpha(!orderAlpha);
  };

  const ordenarData = () => {
    const tasksOrdenadas = tasks.sort((a, b) => {
      if (a.createdAt < b.createdAt) {
        return -1;
      }
      if (a.createdAt > b.createdAt) {
        return 1;
      }
      return 0;
    });
    setTasks(tasksOrdenadas);
  };

  const ordenarStatus = () => {
    const tasksOrdenadas = tasks.sort((a, b) => {
      if (a.status < b.status) {
        return -1;
      }
      if (a.status > b.status) {
        return 1;
      }
      return 0;
    });
    setTasks(tasksOrdenadas);
  };

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
        marginTop: '0.5rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: '40rem',
          minWidth: '50px',
          padding: '1rem',
          backgroundColor: '#f5f5f5',
          borderRadius: '0.5rem',
        }}
      >
        <AddTask fetchTasks={fetchTasks} />
        <Box>
          <Typography variant="h5" component="div">
            Ordenar por:
          </Typography>
          <Button onClick={ordenarAlphabet}>
            Ordem Alfabética
          </Button>
          <Button onClick={ordenarData}>
            Data
          </Button>
          <Button onClick={ordenarStatus}>
            Status
          </Button>
        </Box>
      </Box>
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
            fetchTasks={fetchTasks}
          />
        ))}
      </Box>
    </Box>
  )
}

export default CardDiv