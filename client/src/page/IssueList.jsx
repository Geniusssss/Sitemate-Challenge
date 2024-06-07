import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Issue from '../component/Issue';
import EditDialog from '../component/EditDialog';
import { v4 as uuidv4 } from 'uuid';
import { Container, Typography, Box, Button } from '@mui/material';

const IssueList = () => {
  const [issues, setIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    const response = await axios.get('http://localhost:5000/issues');
    console.log(response.data);
    setIssues(response.data);
  };

  const handleAdd = () => {
    setSelectedIssue(null);
    setDialogOpen(true);
  };

  const handleUpdate = (issue) => {
    setSelectedIssue(issue);
    setDialogOpen(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/issues/${id}`);
    fetchIssues();
  };

  const handleConfirm = async (issue) => {
    if (issue.id) {
      await axios.put(`http://localhost:5000/issues/${issue.id}`, issue);
    } else {
      await axios.post('http://localhost:5000/issues', { id: uuidv4(), ...issue });
    }
    fetchIssues();
    setDialogOpen(false);
  };

  return (
    <Container style={{ marginTop: '20px', marginBottom: '20px' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Issue List
      </Typography>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button onClick={handleAdd} variant="contained">Add Issue</Button>
      </Box>
      {issues.map((issue) => (
        <Issue key={issue.id} issue={issue} onUpdate={handleUpdate} onDelete={handleDelete} />
      ))}
      <EditDialog
        open={dialogOpen}
        handleClose={() => setDialogOpen(false)}
        handleConfirm={handleConfirm}
        issue={selectedIssue}
      />
    </Container>
  );
};

export default IssueList;
