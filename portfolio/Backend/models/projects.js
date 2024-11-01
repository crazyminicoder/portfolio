const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: String,
    description: String,
    technologies: [String],
    imageUrl: String,
    link: String,
  });
  
  module.exports = mongoose.model('projects', projectSchema);//collection_name , schema