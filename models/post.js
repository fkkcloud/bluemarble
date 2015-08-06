var db = require('../db');

var Post = db.model('Post', {
	userId  :  	 { type: String, required: true},
	userName:  	 { type: String, required: true},
	userAge :  	 { type: String, required: true},
	sexTarget: 	 { type: String, required: true},
	sexPlace:  	 { type: String, required: true},
	sexLocation: { type: String, required: true},
	sexTime :  	 { type: String, required: true},
	sexLike :    { type: Number, required: true},
	date    :  	 { type: Date,   required: true, default: Date.now }
});

module.exports = Post;