import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import FileItem from './FileItem';
import CryptoJS from 'crypto-js';

// Helper function to convert a CryptoJS WordArray to a Uint8Array
function wordArrToUint8(wordArr) {
    const words = wordArr.words;
    const sigBytes = wordArr.sigBytes;
    const u8 = new Uint8Array(sigBytes);
    for (let i = 0; i < sigBytes; i++) {
        const byte = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
        u8[i]=byte;
    }
    return u8;
}

const FileList = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await api.get('/api/files');
        setFiles(res.data);
      } catch (err) {
        console.error('Error fetching files:', err);
        if (err.response && err.response.status === 404) {
          setFiles([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  const handleDownload = async (file) => {
    try {
      const secretKey = prompt('Please enter your secret key for decryption:');
      if (!secretKey) {
        alert('A secret key is required for decryption.');
        return;
      }

      const res = await api.get(`/api/files/${file._id}/download`, {
        responseType: 'arraybuffer',
      });

      // Create a WordArray from the ArrayBuffer
      const wordArray = CryptoJS.lib.WordArray.create(res.data);

      // Decrypt using the key
      const decrypted = CryptoJS.AES.decrypt(
        { ciphertext: wordArray },
        secretKey
      );

      // Convert the decrypted WordArray to a Uint8Array
      const typedArray = wordArrToUint8(decrypted);

      if (typedArray.length === 0) {
          throw new Error('Decryption failed, possibly due to an incorrect key.');
      }

      const blob = new Blob([typedArray], { type: file.contentType });

      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = file.metadata.originalname; // Use original name for decrypted file
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (err) {
      console.error('Error downloading or decrypting file:', err);
      alert('Failed to download or decrypt file. Please check the secret key and try again.');
    }
  };

  const handleDelete = async (fileId) => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      try {
        await api.delete(`/api/files/${fileId}`);
        setFiles(files.filter((file) => file._id !== fileId));
        alert('File deleted successfully.');
      } catch (err) {
        console.error('Error deleting file:', err);
        alert('Failed to delete file.');
      }
    }
  };

  if (loading) {
    return <p>Loading files...</p>;
  }

  return (
    <div>
      <h2>Your Files</h2>
      {files.length > 0 ? (
        <ul>
          {files.map((file) => (
            <FileItem
              key={file._id}
              file={file}
              onDownload={() => handleDownload(file)}
              onDelete={() => handleDelete(file._id)}
            />
          ))}
        </ul>
      ) : (
        <p>You have not uploaded any files yet.</p>
      )}
    </div>
  );
};

export default FileList;
