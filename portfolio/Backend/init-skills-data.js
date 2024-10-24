const mongoose = require('mongoose');

// MongoDB connection URI
const MONGODB_URI = 'mongodb://localhost:27017/myportfolio';

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the schema
const SkillsDataSchema = new mongoose.Schema({
  nodes: [{
    id: String,
    group: Number
  }],
  links: [{
    source: String,
    target: String
  }]
});

// Create the model
const SkillsData = mongoose.model('skillsdata', SkillsDataSchema);

// Sample skills data
const sampleSkillsData = {
    nodes: [
      { id: "Full Stack", group: 1 },
      { id: "Frontend", group: 2 },
      { id: "Backend", group: 2 },
      { id: "Programming", group: 1 },
      { id: "C", group: 3 },
      { id: "C++", group: 3 },
      { id: "Java", group: 3 },
      { id: "JavaScript", group: 3 },
      { id: "Python", group: 3 },
      { id: "R", group: 3 },
      { id: "SQL", group: 3 },
      { id: "Machine Learning", group: 1 },
      { id: "TensorFlow", group: 4 },
      { id: "PyTorch", group: 4 },
      { id: "Keras", group: 4 },
      { id: "Scikit-learn", group: 4 },
      { id: "Data Engineering", group: 1 },
      { id: "Tableau", group: 5 },
      { id: "Power BI", group: 5 },
      { id: "Azure Data Factory", group: 5 },
      { id: "ETL Processes", group: 5 },
      { id: "Data Integration", group: 5 },
      { id: "Web Technologies", group: 1 },
      { id: "React", group: 11 },
      { id: "Node.js", group: 6 },
      { id: "Express", group: 6 },
      { id: "Next.js", group: 11 },
      { id: "APIs & Data Formats", group: 1 },
      { id: "RESTful API", group: 7 },
      { id: "WebSocket API", group: 7 },
      { id: "JSON", group: 7 },
      { id: "XML", group: 7 },
      { id: "Automation Tools", group: 1 },
      { id: "UIPath", group: 8 },
      { id: "RPA", group: 8 },
      { id: "Cloud Platforms", group: 1 },
      { id: "AWS", group: 9 },
      { id: "Azure DevOps", group: 9 },
      { id: "Databases", group: 1 },
      { id: "MySQL", group: 10 },
      { id: "MongoDB", group: 10 },
      { id: "PostgreSQL", group: 10 }
    ],
    links: [
      { source: "Full Stack", target: "Frontend" },
      { source: "Full Stack", target: "Backend" },
      { source: "Full Stack", target: "Databases" },
      { source: "Full Stack", target: "Automation Tools" },
      { source: "Frontend", target: "Web Technologies" },
      { source: "Web Technologies", target: "React" },
      { source: "Web Technologies", target: "Next.js" },
      { source: "Frontend", target: "JavaScript" },
      { source: "Backend", target: "Node.js" },
      { source: "Backend", target: "Databases" },
      { source: "Backend", target: "Express" },
      { source: "Backend", target: "APIs & Data Formats" },
      { source: "APIs & Data Formats", target: "RESTful API" },
      { source: "APIs & Data Formats", target: "WebSocket API" },
      { source: "APIs & Data Formats", target: "JSON" },
      { source: "APIs & Data Formats", target: "XML" },
      { source: "Databases", target: "MySQL" },
      { source: "Databases", target: "MongoDB" },
      { source: "Databases", target: "PostgreSQL" },
      { source: "Programming", target: "C" },
      { source: "Programming", target: "C++" },
      { source: "Programming", target: "Java" },
      { source: "Programming", target: "JavaScript" },
      { source: "Programming", target: "Python" },
      { source: "Programming", target: "R" },
      { source: "Programming", target: "SQL" },
      { source: "Machine Learning", target: "TensorFlow" },
      { source: "Machine Learning", target: "PyTorch" },
      { source: "Machine Learning", target: "Keras" },
      { source: "Machine Learning", target: "Scikit-learn" },
      { source: "Data Engineering", target: "ETL Processes" },
      { source: "Data Engineering", target: "Data Integration" },
      { source: "Data Engineering", target: "Tableau" },
      { source: "Data Engineering", target: "Power BI" },
      { source: "Data Engineering", target: "Azure Data Factory" },
      { source: "Automation Tools", target: "UIPath" },
      { source: "Automation Tools", target: "RPA" },
      { source: "Cloud Platforms", target: "AWS" },
      { source: "Cloud Platforms", target: "Azure DevOps" },
      { source: "Machine Learning", target: "Data Engineering" },
      { source: "Web Technologies", target: "Backend" },
      { source: "Data Engineering", target: "Databases" },
      { source: "Cloud Platforms", target: "Data Engineering" }
    ]
  };

// Function to initialize the database
async function initializeDatabase() {
  try {
    // Clear existing data
    await SkillsData.deleteMany({});
    
    // Insert new data
    const newSkillsData = new SkillsData(sampleSkillsData);
    await newSkillsData.save();
    
    console.log('Skills data initialized successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error initializing database:', error);
    mongoose.connection.close();
  }
}

// Run the initialization
initializeDatabase();