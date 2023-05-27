const { Schema, model, Types } = require('mongoose');

const extraSchema = new Schema({
  title: { type: String, required: true },
  icon: { type: String },
  cars: [{ type: Types.ObjectId, ref: 'Car' }],
});

const Extra = model('Extra', extraSchema);
module.exports = Extra;
