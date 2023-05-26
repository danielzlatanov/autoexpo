const { Schema, model } = require('mongoose');

const extraSchema = new Schema({
  title: { type: String, required: true },
  icon: { type: String },
});

const Extra = model('Extra', extraSchema);
module.exports = Extra;
