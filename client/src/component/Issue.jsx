import React from 'react';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';

const Issue = ({ issue, onUpdate, onDelete }) => {
  return (
    <Card variant="outlined" sx={{ marginBottom: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {issue.title}
        </Typography>
        <Typography variant="body2">
          {issue.description}
        </Typography>
        <Grid container justifyContent="flex-end">
          <Button size="small" color="primary" onClick={() => onUpdate(issue)}>Update</Button>
          <Button size="small" color="secondary" onClick={() => onDelete(issue.id)}>Delete</Button>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Issue;