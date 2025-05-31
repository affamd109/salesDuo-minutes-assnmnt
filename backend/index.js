const express = require('express');
const multer = require('multer');
const fsPromises = require('fs').promises; // Use promises API for non-blocking operations
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
const processMeetingNotes  = require('./geminiService');

const upload = multer({ dest: 'uploads/' });

dotenv.config();

app.use(express.json());
app.use(express.text({ type: 'text/plain' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.send("Backend working");
});

app.post('/process-meeting', upload.single('file'), async (req, res) => {
  try {
    let content = '';

    if (req.file) {
      // case 1: .txt file uploaded
      content = await fsPromises.readFile(req.file.path, 'utf-8');
      await fsPromises.unlink(req.file.path); // Cleanup uploaded file
    } else if (req.is('application/json') && req.body.text) {
      // case 2: JSON body
      content = req.body.text;
    } else if (req.is('text/plain')) {
      // case 3: raw text/plain
      content = req.body;
    } else {
      return res.status(400).json({ error: 'No valid input provided or the input is missing' });
    }

    console.log(content);

    const result = await processMeetingNotes(content);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong at the server side' });
  }
});

//this middleware is for error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
