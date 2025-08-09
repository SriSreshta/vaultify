import React from 'react';
import FileUpload from '../components/FileUpload';
import FileList from '../components/FileList';

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your secure file storage.</p>
      <hr />
      <h2>Upload New File</h2>
      <FileUpload />
      <hr />
      <FileList />
    </div>
  );
};

export default Dashboard;
