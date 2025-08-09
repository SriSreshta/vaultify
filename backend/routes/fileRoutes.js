const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

// This needs a reference to the Mongoose connection
const conn = mongoose.connection;
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'uploads'
  });
});

// @route   POST /api/files/upload
// @desc    Upload a file
// @access  Private
router.post('/upload', protect, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }
  res.json({ file: req.file });
});

// @route   GET /api/files
// @desc    Get all user's files
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const files = await gfs.find({ 'metadata.owner': req.user.id }).toArray();
    if (!files || files.length === 0) {
      return res.status(404).json({ msg: 'No files found' });
    }
    return res.json(files);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/files/:filename
// @desc    Download a single file
// @access  Private
router.get('/:filename', protect, async (req, res) => {
  try {
    const files = await gfs.find({ filename: req.params.filename }).toArray();

    if (!files || files.length === 0) {
      return res.status(404).json({ msg: 'No file exists' });
    }

    const file = files[0];

    // Check if user is the owner
    if (file.metadata.owner.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
    }

    res.set({
        'Content-Type': file.contentType,
        'Content-Disposition': `attachment; filename="${file.metadata.originalname}"`,
    });

    const readstream = gfs.openDownloadStream(file._id);
    readstream.pipe(res);

  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/files/:id
// @desc    Delete a file
// @access  Private
router.delete('/:id', protect, async (req, res) => {
    try {
        const file = await gfs.find({ _id: new mongoose.Types.ObjectId(req.params.id), 'metadata.owner': req.user.id }).toArray();

        if (!file || file.length === 0) {
            return res.status(404).json({ msg: 'File not found or user not authorized' });
        }

        await gfs.delete(new mongoose.Types.ObjectId(req.params.id));
        res.json({ msg: 'File deleted successfully' });

    } catch (err) {
        console.error(err);
        if (err.name === 'BSONTypeError') {
            return res.status(400).json({ msg: 'Invalid file ID format' });
        }
        res.status(500).send('Server Error');
    }
});

module.exports = router;
