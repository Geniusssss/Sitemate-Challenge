import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

const EditDialog = ({ open, handleClose, handleConfirm, issue }) => {
  const [title, setTitle] = useState(issue ? issue.title : '');
  const [description, setDescription] = useState(issue ? issue.description : '');

  useEffect(() => {
    if (issue) {
      setTitle(issue.title);
      setDescription(issue.description);
    }
  }, [issue]);

  const handleSubmit = () => {
    if (title.trim()) {
      handleConfirm({ ...issue, title, description });
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{issue ? 'Edit Issue' : 'Add Issue'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          label="Title"
          type="text"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Description"
          type="text"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;