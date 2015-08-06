var mongoose = require('mongoose');
var url = process.env.MONGOLAB_URI || 'mongodb://localhost/lastsex';

mongoose.connect(url, function(err){
	if (err)
		console.log('mongodb:', err);
	console.log('mongodb connected')
}, function(){
	console.log('mongodb not connected');
});


module.exports = mongoose;