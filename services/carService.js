const Car = require('../models/Car.js');

async function getData(search, minPrice, maxPrice) {
  const query = {};
  if (search) {
    query.name = new RegExp(search, 'i');
  }

  if (minPrice) {
    query.price = { $gte: minPrice, $lte: 999999999 };
  }

  if (maxPrice) {
    query.price = { $gte: 100, $lte: maxPrice };
  }

  return Car.find(query).lean();
}

async function getCarById(id) {
  return Car.findById(id).populate('extras').lean();
}

async function createCar(carData, ownerId) {
  const car = {
    name: carData.name,
    year: Number(carData.year),
    price: Number(carData.price),
    image: carData.imageUrl,
    description: carData.description,
    owner: ownerId,
  };

  const errorFields = Object.entries(car).filter(
    ([k, v]) =>
      !v || (k == 'year' && (v < 1950 || v > 2023)) || (k == 'price' && (v < 100 || v > 999999999))
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
        return `${e[0]} must be greater than $100 and less than $999999999`;
      }

      return `${e[0]} is a required field`;
    });

    throw new Error(errors.join('\n'));
  }

  const result = await Car.create(car);
  return result;
}

async function editCar(carData, carId) {
  const errorFields = Object.entries(carData).filter(
    ([k, v]) =>
      !v || (k == 'year' && (v < 1950 || v > 2023)) || (k == 'price' && (v < 100 || v > 999999999))
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
        return `${e[0]} must be greater than $100 and less than $999999999`;
      }

      return `${e[0]} is a required field`;
    });

    throw new Error(errors.join('\n'));
  }

  const car = await Car.findById(carId);

  car.name = carData.name;
  car.year = Number(carData.year);
  car.price = Number(carData.price);
  car.image = carData.imageUrl;
  car.description = carData.description;

  await car.save();
  return car;
}

async function deleteCar(carId) {
  return Car.findByIdAndRemove(carId);
}

module.exports = {
  getData,
  getCarById,
  createCar,
  editCar,
  deleteCar,
};
