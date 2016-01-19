var router = require('express').Router();

router.use('/', require('./static')); // same as app.use(require('./controllers/api/static'))

router.use('/api', require('./api'));

module.exports = router;