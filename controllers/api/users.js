var router = require('express').Router();
var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');
var User = require('../../models/user');
var config = require('../../config');

// user정보를 가져오려고 한다. 
// 만약 token이 없다면
// jwt로 해독을 해서 유저정보조차 가져오지 못함으로,
// 401(Unauthorized) HTTP code를 보내고,
// 아니라면, 정보를 해독하여, 유저정보를 클라이언트에 보낸다.
router.get('/', function(req, res, next){
	if (!req.headers['x-auth']){
		return res.sendStatus(401);
	}
	//var auth = jwt.decode(req.headers['x-auth'], config.secret);
	User.findOne({_id: req.auth._id}, function(err, user){
		if (err) { return next(err); }
		// db schema에서 자동으로 password가 select:false이기 때문에,
		// password 내용을 제외한 값이 클라이언트로 안전하게 보내진다.
		res.json(user);
	});
});

// 일단, bodyParser middleware를 통해 받은 결과로 req.body.로 username을 가져오고,
// User 데이타 인스턴스를 만든다.
// bcrypt를 통해 값을 해쉬한다. 이때, 콜백펑션을 등록해둔다.
// 해쉬값이 완성되는대로 콜백펑션이 불러지고, hash값을 마저 데이터 인스턴스에 기입하고,
// save를 해서 DB에 upload한다.
// upload가 성공하면 201(Created) HTTP Code를 보낸다.
router.post('/', function(req, res, next){
	// 유저가 이미 존재하는지 확인한다.
	User.findOne({userName: req.body.userName}, function(err, user){
		if (err) { return next(err); }
		if (user != null && user.userName == req.body.userName)
		{
			console.log(user.userName);
			return res.sendStatus(400);
		}
		
		//리퀘스트한 정보로 유저데이터를 만든다.
		var user = new User(
			{
				userName: req.body.userName,
				userdob : req.body.userdob,
				sexPos  : req.body.sexPos
			});

		//비밀번호를 해쉬화하고, 유저데이터 제작은 완료, 업로드
		bcrypt.hash(req.body.password, 10, function(err, hash){
			if (err) { return next(err); }
			user.password = hash;

			user.save(function(err){
				if (err) { return next(err); }
				res.sendStatus(201);
			});
		});
	});
});

router.post('/password_change', function(req, res, next){
	// start finding the user with _id first
	User.findOne({userName: req.body.username})
	.select('password') // select한 프로퍼티만 가져오자
	.exec(function (err, user){
		if (err) { return next(err); }
		if (!user) { return res.send(400); } // can not find user
		
		// if it was able to find user, check password
		bcrypt.compare(req.body.password, user.password, function(err, valid){
			if (err) { return next(err); }
			if (!valid) { return res.send(401); } // password is wrong

			// if password is correct, create new password with hashed
			bcrypt.hash(req.body.newPassword, 10, function(err, hash){
				if (err) { return next(err); }

				// if hashing is done, update the password with it
				var conditions = { userName: req.body.username }
				var update     = { $set: { password: hash }}
				var options    = { };
				User.update(conditions, update, options, function(err){
					if (err) { return next(err); }
					
					return res.sendStatus(200);
				});
			});
		});
	});
});

module.exports = router;