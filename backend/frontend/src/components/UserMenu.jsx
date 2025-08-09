import React, { useState, useEffect, useRef } from 'react';
import api from '../utils/api';

const UserMenu = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const dropdownRef = useRef(null);

  // Fetch files when the dropdown is opened
  useEffect(() => {
    if (!isOpen) return;

    const fetchFiles = async () => {
      try {
        const res = await api.get('/files');
        setFiles(res.data);
      } catch (err) {
        console.error(err);
        setFiles([]);
      }
    };
    fetchFiles();
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="block h-10 w-10 rounded-full overflow-hidden border-2 border-gray-300 focus:outline-none focus:border-blue-400">
        {/* Simple person icon using SVG */}
        <svg className="h-full w-full text-gray-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 20.993V24H0v-2.997A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      </button>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1">
            <div className="px-4 py-2 text-xs text-gray-500 border-b">Your Files</div>
            <div className="max-h-60 overflow-y-auto">
              {files.length > 0 ? (
                files.map(file => (
                  <div key={file._id} className="px-4 py-2 text-sm text-gray-700">
                    {file.metadata.originalname}
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-sm text-gray-500">No files found.</div>
              )}
            </div>
            <div className="border-t">
              <a
                href="#!"
                onClick={onLogout}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
