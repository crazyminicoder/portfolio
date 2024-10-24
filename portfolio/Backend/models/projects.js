const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageUrl: String,
    technologies: [String],
  });
  
  module.exports = mongoose.model('projects', projectSchema);//collection_name , schema