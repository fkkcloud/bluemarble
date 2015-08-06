var jwt = require('jwt-simple');
var config = require('./config');

// 미들웨어이다.
// req에 새로운 변수를 만들고 저장한다.`
// 저장하는 값은 토큰을 jwt알고리즘으로 decode한 값이다.
// 모든 컨트롤러는 이 미들웨어를 거친다.
module.exports = function(req, res, next){
	// req.headers['x-auth']값은 user서비스에서,
	// session api를 통해 로그인할때, 성공적이면 받은
	// token값을 저장되있어야 할 값이다.
	// 즉 이로 인해, 모든 api controller요청은 이를 사용하고, 
	// 로그인이 정상적으로 이뤄진 후에는 req.auth로부터 유저값을 가져올수 있어야 한다. 
	req.auth = null;

	if (req.headers['x-auth']){
		req.auth = jwt.decode(req.headers['x-auth'], config.secret);
	}
	next();
};