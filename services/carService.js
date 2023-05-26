const Car = require('../models/Car.js');

function getData() {
  return Car.find({}).lean();
}

function getCarById(id) {
  return Car.findById(id).lean();
}

async function createCar(carData) {
  const car = {
    name: carData.name,
    year: Number(carData.year),
    price: Number(carData.price),
    image: carData.imageUrl,
    description: carData.description,
  };

  const errorFields = Object.entries(car).filter(
    ([k, v]) =>
      !v || (k == 'year' && (v < 1950 || v > 2023)) || (k == 'price' && v < 100)
  );

  if (errorFields.length > 0) {
    const errors = errorFields.map((e) => {
      if (e[0] == 'name') {
        return `make and model are required`;
      }
      if (e[0] == 'year') {
        return `${e[0]} must be in the range 1950-2023`;
      }
      if (e[0] == 'price') {
        return `${e[0]} must be greater than $100`;
      }

      return `${e[0]} is a required field`;
    });

    throw new Error(errors.join('\n'));
  }

  const result = await Car.create(car);
  return result;
}

module.exports = {
  getData,
  getCarById,
  createCar
};
