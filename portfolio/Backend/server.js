const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const SkillsData = require('./models/SkillsData');
const Project = require('./models/projects')

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection URI
const MONGODB_URI = '';


// Connect to MongoDB
mongoose.connect(MONGODB_URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
  console.log(`Using database: ${db.name}`);
});



// Route to get all projects from 'projects' collection
app.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/skillsdata', async (req, res) => {
    try {
      // Fetch the first document from the 'skillsdata' collection
      const skillsData = await SkillsData.findOne({}); // Fetch the first document
      
      if (skillsData) {
        console.log('SkillsData fetched:', skillsData);
        res.json(skillsData); // Send the fetched data as a JSON response
      } else {
        console.log('No SkillsData found');
        res.json({ message: 'No skills data found in the collection' });
      }
    } catch (error) {
      console.error('Error fetching SkillsData:', error);
      res.status(500).json({ error: error.message });
    }
  });
  
  
  

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
