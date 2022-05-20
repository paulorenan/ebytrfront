import React, {useState, useEffect} from 'react';
import { Box, Card } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import EditTask from './EditTask';
import DelTask from './DelTask';

export default function TaskCard({ task, fetchTasks }) {
  const [status, setStatus] = useState({});

  useEffect(() => {
    switch (task.status) {
      case '0':
        setStatus({
          color: 'vermelho',
          text: 'Pendente',
        });
        break;
      case '1':
        setStatus({
          color: 'amarelo',
          text: 'Em Andamento',
        });
        break;
        case '2':
        setStatus({
          color: 'verde',
          text: 'Concluída',
        });
        break;
      default:
        setStatus({
          color: 'amarelo',
          text: 'Pendente',
        });
    }
  }, [task.status]);

  return (
    <Card sx={{ width: '100%', maxWidth: '30rem', marginTop: '1rem' }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {task.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {task.description}
        </Typography>
      </CardContent>
      <CardActions sx={ { justifyContent: 'space-between' } }>
        <Box sx={ { display: 'flex', alignItems: 'center' } }>
          <Typography className={status.color}>
            {status.text}
          </Typography>
          <Typography sx={{ marginLeft: '10px' }} >
            { new Date(task.createdAt).toLocaleDateString('pt-BR') }
          </Typography>
        </Box>
        <Box sx={ { display: 'flex', alignItems: 'center' } }>
          <EditTask task={task} fetchTasks={fetchTasks} />
          <DelTask task={task} fetchTasks={fetchTasks} />
        </Box>
      </CardActions>
    </Card>
  );
}
