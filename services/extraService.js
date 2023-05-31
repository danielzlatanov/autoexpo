const Car = require('../models/Car.js');
const Extra = require('../models/Extra.js');

async function getExtras() {
  return Extra.find({}).lean();
}

async function createExtra(title, icon) {
  return Extra.create({
    title,
    icon,
  });
}

async function modifyCarExtras(carId, extrasIds) {
  const car = await Car.findById(carId).populate('extras');
  const extras = await Extra.find({ _id: { $in: extrasIds } });

  const removedExtras = car.extras.filter((carExtra) =>
    extras.every((extra) => extra._id.toString() != carExtra._id.toString())
  );
  removedExtras.forEach((e) => {
    e.cars.splice(
      e.cars.findIndex((eId) => eId.toString() == carId),
      1
    );

    car.extras.splice(
      car.extras.findIndex((x) => x._id.toString() == e._id.toString()),
      1
    );
  });

  const newExtras = extras.filter((extra) =>
    car.extras.every(
      (carExtra) => carExtra._id.toString() != extra._id.toString()
    )
  );

  newExtras.forEach((extra) => {
    car.extras.push(extra);
    extra.cars.push(car);
  });

  await car.save();
  await Promise.all(removedExtras.map((e) => e.save()));
  await Promise.all(newExtras.map((e) => e.save()));
}

module.exports = {
  getExtras,
  createExtra,
  modifyCarExtras,
};
