const express = require('express');
const multer = require('multer');
const fsPromises = require('fs').promises;
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
const processMeetingNotes = require('./geminiService');

dotenv.config();


//this allows me to only upload .txt file and limits upload to 2mb
const upload = multer({
  dest: 'uploads/',
  limits: { fileSize: 2 * 1024 * 1024 },  //only for 2mb
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'text/plain') {
      cb(null, true);
    } else {
      cb(new Error('Only .txt files are allowed!'), false);
    }
  }
});

app.use(express.json());
app.use(express.text({ type: 'text/plain' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.send("Backend working");
});

// for .txt file upload
app.post('/process-meeting-file', upload.single('file'), async (req, res) => {
  try {
    const content = await fsPromises.readFile(req.file.path, 'utf-8');
    await fsPromises.unlink(req.file.path);

    const result = await processMeetingNotes(content);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Error processing file' });
  }
});

// for pasted/plain text
app.post('/process-meeting-text', async (req, res) => {
  try {
    let content = '';

    if (req.is('application/json') && req.body.text) {
      content = req.body.text;
    } else if (req.is('text/plain')) {
      content = req.body;
    } else {
      return res.status(400).json({ error: 'No valid input provided' });
    }

    const result = await processMeetingNotes(content);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Error processing text' });
  }
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
