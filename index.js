const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const port = 3700;

// Your database connection function
async function connectToDatabase() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/user2', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToDatabase();

const noteSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
});

const Note = mongoose.model('Note', noteSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const staticPath = path.join('C:/Users/Lenovo/webpages/49-asentus/HTML');
app.use(express.static(staticPath));

// Handle GET requests to the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the website!');
});

// Handle form submission
app.post('/submit', async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    const newNote = new Note({
      name,
      email,
      phone,
      message,
    });

    await newNote.save();

    console.log('Note submitted:', newNote);
    
    res.sendFile(path.join(__dirname, 'suc.html'));
  } catch (error) {
    console.error('Error submitting note:', error);
    res.status(500).send('Note submission failed.');
  }
});

// Handle other routes with a 404 response
app.use((req, res) => {
  res.status(404).send('404 - Not Found');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
