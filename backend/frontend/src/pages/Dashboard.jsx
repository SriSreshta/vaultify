import React from 'react';
import FileUpload from '../components/FileUpload';

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your secure file storage.</p>
      <FileUpload />
      {/* File list will go here in a future task */}
    </div>
  );
};

export default Dashboard;
