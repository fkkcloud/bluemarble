var db = require('../db');

var user = db.Schema({
	userName: { type:String, required: true },
	password: { type:String, required: true, select:  false },
	userdob : { type:Date, 	 required: true },
	sexPos  : { type:String, required: true }
});

module.exports = db.model('User', user);