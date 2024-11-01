// models/SkillsData.js
const mongoose = require('mongoose');

const SkillsDataSchema = new mongoose.Schema({
  nodes: [
    {
      id: String,
      group: Number
    }
  ],
  links: [
    {
      source: String,
      target: String
    }
  ]
});

module.exports = mongoose.model('SkillsData', SkillsDataSchema, 'skillsdatas');

