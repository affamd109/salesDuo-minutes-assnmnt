const express = require('express');
const multer = require('multer');
const fsPromises = require('fs').promises;
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
const processMeetingNotes = require('./geminiService');
const upload = multer({ dest: 'uploads/' });

dotenv.config();


//this allows me to only upload .txt file and limits upload to 2mb


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
      content = await fsPromises.readFile(req.file.path, 'utf-8');
      await fsPromises.unlink(req.file.path);
    } else if (req.is('application/json') && req.body.text) {
      content = req.body.text;
    } else if (req.is('text/plain')) {
      content = req.body;
    } else {
      return res.status(400).json({ error: 'No valid input provided or the input is missing' });
    }

    console.log('Received content:', content); // <--- Add this

    const result = await processMeetingNotes(content);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Something went wrong at the server side' });
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
