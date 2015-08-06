var Post = require('../../models/post');
var router = require('express').Router();
//var websockets = require('../../websockets');

router.get('/', function(req, res, next){
	Post.find()
	.sort('-date')
	.exec(function(err, posts){
		if (err) { return next(err); }
		return res.json(posts);
	});
});

/* pagination
	http://localhost:3000/api/posts/page?perpage=page
	http://localhost:3000/api/posts/1?perpage=2
*/
router.get('/:page', function(req, res, next){
	var perPage = req.query.perpage;
	var page    = req.params.page;

	Post.find()
	.sort('-date')
    .limit(perPage)
	.skip(perPage * page)  	
	.exec(function(err, posts) {
     	return res.json(posts);
    })
});

router.post('/', function(req, res, next){
	// for uploading post, check if the user is logged in,
	if (!req.auth) {
		return res.sendStatus(401);
	}

	var userAge = getUserAge(req.auth);

	var post = new Post({
		// username을 req.auth.username으로 가져오고 있다.
		// 로그인이 되어 있지않다면 이 값이 undefined임으로 .save를 할수 없어야 한다.

		userName: req.auth.userName,
		userId  : req.auth._id,
		userAge : userAge,
		sexTarget: req.body.sexTarget,
		sexPlace:  req.body.sexPlace,
		sexLocation : req.body.sexLocation,
		sexTime :  req.body.sexTime,
		sexLike : 0
	});

	post.save(function(err, post){
		if (err) { return next(err); }

		// send broadcast through web socket to other clients to receive msg (누군가 포스트를 했다는)
		//websockets.broadcast('new_post', post);

		// 201 - The request has been fulfilled and resulted in a new resource being created.
		res.json(201, post); 
	});
});

function getUserAge(user){
	var userdob = new Date(user.userdob);
	var now = new Date();
	return now.getYear() - userdob.getYear();
}

module.exports = router;
