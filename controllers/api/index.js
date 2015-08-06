
var router = require('express').Router();

router.use('/posts', require('./posts'));

router.use('/sessions', require('./sessions'));

router.use('/users', require('./users'));

module.exports = router;