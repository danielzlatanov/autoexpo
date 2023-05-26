const { Schema, model } = require('mongoose');

const carSchema = new Schema({
  name: { type: String, required: true },
  year: { type: Number, required: true, min: 1950, max: 2023 },
  price: { type: Number, required: true, min: 100 },
  image: { type: String, required: true },
  description: { type: String, required: true },
});

const Car = model('Car', carSchema);
module.exports = Car;
