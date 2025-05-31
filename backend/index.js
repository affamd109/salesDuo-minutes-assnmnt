const express = require('express');
const multer = require('multer');
const fs = require('fs'); //this is the file system module reqd for reading .txt file
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

app.get('/' , (req , res) =>{
  res.send("Backend working")
})



app.post('/process-meeting', upload.single('file'), async (req, res) => {
  try {
    let content = '';

    if (req.file) {

      // case 1: .txt file uploaded
      content = fs.readFileSync(req.file.path, 'utf-8'); //this reads file from disk
      fs.unlinkSync(req.file.path); // Cleanup of already read files

    } else if (req.is('application/json') && req.body.text) {
      // case 2: JSON body 
      content = req.body.text;

    } else if (req.is('text/plain')) {
      // case 3: raw text/plain
      content = req.body;

    } else {
      return res.status(400).json({ error: 'No valid input provided or the input is missing' });
    } //400 cuz its a client error and not a server error

    const result = await processMeetingNotes(content);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong at the server side' });
  }
});



const PORT = process.env.PORT || 3000;

app.listen(PORT , ()=>{
    console.log(`Server running on ${PORT}`)
})