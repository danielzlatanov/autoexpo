const fs = require('fs');

const filepath = './models/data.json';

const data = JSON.parse(fs.readFileSync(filepath));

async function redo() {
	return new Promise((resolve, reject) => {
		fs.writeFile(filepath, JSON.stringify(data, null, 2), err => {
			if (err == null) {
				return resolve();
			}
			reject(err);
		});
	});
}

function getData() {
	return data;
}

function getCarById(id) {
	return data.find(c => c.id === id);
}

async function createCar(carData) {
	const car = {
		id: uniqueID(),
		name: carData.name,
		year: Number(carData.year),
		price: Number(carData.price),
		imgUrl: carData.imageUrl,
		description: carData.description,
	};
	data.push(car);
	await redo();
	return car;
}

function uniqueID() {
	return Math.floor(Math.random() * Date.now()).toString(16);
}

module.exports = {
	getData,
	getCarById,
	createCar,
};
