var express = require('express');
var router = express.Router();

router.use(express.static(__dirname + '/../assets'));
router.use(express.static(__dirname + '/../scripts'));
router.use(express.static(__dirname + '/../resources'));
router.use(express.static(__dirname + '/../dataviz'));
router.use(express.static(__dirname + '/../node_modules/sweetalert/dist'));
router.use(express.static(__dirname + '/../bower_components/tween.js/src'));

router.use('/templates', express.static(__dirname + '/../templates'));


// ejs 를 통해서 렌더하기 떄문에 자동으로 /views/ 안에 .html.ejs를 찾는다.
router.get('/', function(req, res){
	// render/ejs is now easier to use since
  	// sendFile has security restrictions on relative pathing // res.sendFile('a.html')
	res.render('app.html.ejs');
});

module.exports = router;