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

export default function AddTask() {
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

  const handleSubmit = () => {
    if (title === '' || description === '') {
      alert('Preencha todos os campos');
      return;
    }
    setLoading(true);
    axios.post('https://ebytrback.herokuapp.com/tasks', {
      title,
      description,
      status,
    }).then(res => {
      setOpen(false);
      setTitle('');
      setDescription('');
      setStatus('0');
      setLoading(false);
    }).catch(err => {
      alert('Erro ao cadastrar tarefa');
      setLoading(false);
    });
  };


  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Adicionar Tarefa
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Adicionar Tarefa</DialogTitle>
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
            Adicionar
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
