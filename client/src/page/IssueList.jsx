import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Issue from '../component/Issue';

const IssueList = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    const response = await axios.get('http://localhost:5000/issues');
    console.log(response.data);
    setIssues(response.data);
  };

  const handleUpdate = (issue) => {

  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/issues/${id}`);
    fetchIssues();
  };

  return (
    <div>
      {issues.map((issue) => (
        <Issue key={issue.id} issue={issue} onUpdate={handleUpdate} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default IssueList;
