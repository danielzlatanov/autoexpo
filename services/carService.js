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
		image: carData.imageUrl,
		description: carData.description,
	};

	const missingFields = Object.entries(car).filter(
		([k, v]) => !v || (k == 'year' && v < 1950) || v > 2023 || (k == 'price' && v < 100)
	);

	if (missingFields.length > 0) {
		const errors = missingFields.map(e => {
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
