const router = require('express').Router();

router.get('/', (req, res) => {
	res.render('catalog', {
		title: 'Catalog Page',
	});
});

router.get('/:id', (req, res) => {
	res.render('details', {
		title: 'Catalog Details Page',
	});
});

module.exports = router;
