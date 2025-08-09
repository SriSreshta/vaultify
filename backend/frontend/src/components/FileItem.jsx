import React from 'react';

// Helper function to format bytes into a human-readable string
const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const FileItem = ({ file, onDownload, onDelete }) => {
  return (
    <li style={{ listStyleType: 'none', marginBottom: '10px', border: '1px solid #ccc', padding: '10px' }}>
      <div>
        <strong>{file.metadata.originalname}</strong>
      </div>
      <div>
        <span>Size: {formatBytes(file.length)}</span>
      </div>
      <div>
        <span>Uploaded: {new Date(file.uploadDate).toLocaleString()}</span>
      </div>
      <button onClick={onDownload} style={{ marginRight: '10px' }}>Download</button>
      <button onClick={onDelete}>Delete</button>
    </li>
  );
};

export default FileItem;
