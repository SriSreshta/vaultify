import React, { useState } from 'react';
import FileUpload from '../components/FileUpload';

const Dashboard = ({ user }) => {
  const [showUpload, setShowUpload] = useState(false);

  return (
    <div className="text-center mt-10">
      <div className="bg-white p-8 rounded-lg shadow-md inline-block">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          What would you like to do?
        </h2>
        <p className="text-gray-600 mb-6">
          Choose an option below to get started.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
            onClick={() => alert('Sharing feature coming soon!')}
          >
            Share File
          </button>
          <button
            className="bg-blue-300 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
            onClick={() => setShowUpload(true)}
          >
            Store File
          </button>
        </div>
      </div>

      {showUpload && (
        <div className="mt-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Store a Secure File</h3>
          <div className="bg-white p-8 rounded-lg shadow-md inline-block w-full max-w-2xl">
            <FileUpload />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
