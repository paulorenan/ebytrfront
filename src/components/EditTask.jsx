import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Box, MenuItem, Select } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

export default function EditTask({ task, fetchTasks }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('0');
  const [loading, setLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
  }, [task]);

  const handleSubmit = () => {
    if (title === '' || description === '') {
      alert('Preencha todos os campos');
      return;
    }
    setLoading(true);
    axios.put(`https://ebytrback.herokuapp.com/tasks/${task._id}`, {
      title,
      description,
      status,
    }).then(() => {
      setOpen(false);
      fetchTasks();
      setLoading(false);
    }).catch(() => {
      alert('Erro ao editar tarefa');
      setLoading(false);
    });
  };


  return (
    <div>
      <Button variant="text" size='small' onClick={handleClickOpen}>
        Editar
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Editar Tarefa</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Título"
              type="text"
              fullWidth
              variant="standard"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
            <TextField
              margin="dense"
              id="description"
              label="Descrição"
              type="text"
              fullWidth
              variant="standard"
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
            />
            <Select
              margin="dense"
              id="status"
              label="Status"
              type="text"
              fullWidth
              variant="standard"
              value={status}
              onChange={e => setStatus(e.target.value)}
              sx={{ marginTop: '1.5rem' }}
              required
            >
              <MenuItem value="0">Pendente</MenuItem>
              <MenuItem value="1">Em Andamento</MenuItem>
              <MenuItem value="2">Concluída</MenuItem>
            </Select>
          </Box>
        </DialogContent>
        <DialogActions>
          <LoadingButton onClick={handleClose} loading={loading}>
            Cancelar
          </LoadingButton>
          <LoadingButton onClick={handleSubmit} type='submit' loading={loading}>
            Editar
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
