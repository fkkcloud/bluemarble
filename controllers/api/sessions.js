var router = require('express').Router();
var User = require('../../models/user');
var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');
var config = require('../../config');

// session에서는, 전달된 username으로 비밀번호를 'select'로 가져와 
// (data schema에서 select가 'false'로 지정되어 있기 때문에)
// 비밀번호를 bcrypt로 해시하여 저장된 해시값(비밀번호)와 비교하고, 
// 만약 일치한다면, jwt로 username객체를 encode해서
// token으로 클라이언트에 보낸다.
router.post('/', function(req, res, next){
	var username = req.body.username;

	console.log('session input :' + username);

	User.findOne({userName: username})
	.select('_id')
	.select('userdob')
	.select('sexPos')
	.select('userName')
	.select('password') // select한 프로퍼티만 가져오자
	.exec(function (err, user){
		if (err) { return next(err); }
		if (!user) { return res.send(401); }
		bcrypt.compare(req.body.password, user.password, function(err, valid){
			if (err) { return next(err); }
			if (!valid) { return res.send(401); }

			var output = {
					_id     : user._id,
					userName: user.userName,
					userdob : user.userdob,
					sexPos  : user.sexPos
				};

			console.log(output);

			var token = jwt.encode(output, config.secret);
			res.send(token);
		});
	});
});

module.exports = router;