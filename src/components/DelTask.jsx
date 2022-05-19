import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios';

export default function DelTask({task, fetchTasks}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    setLoading(true);
    axios.delete(`https://ebytrback.herokuapp.com/tasks/${task._id}`).then(() => {
      setOpen(false);
      fetchTasks();
      setLoading(false);
    }).catch(() => {
      alert('Erro ao deletar tarefa');
      setLoading(false);
    });
  };

  return (
    <div>
      <Button variant="text" size='small' onClick={handleClickOpen}>
        Excluir
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Excluir Tarefa
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Deseja excluir a tarefa "${task.title}"?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <LoadingButton onClick={handleClose} loading={loading}>
            Cancelar
          </LoadingButton>
          <LoadingButton onClick={handleSubmit} loading={loading}>
            Excluir
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
