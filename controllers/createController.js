const router = require('express').Router();

router.get('/', (req, res) => {
	res.render('create', {
		title: 'Create Page',
	});
});

router.post('/', (req, res) => {
	res.render('create', {
		title: 'Submitted',
	});
});

module.exports = router;
