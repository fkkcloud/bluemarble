var mongoose = require('mongoose');
var url = process.env.MONGOLAB_URI || 'mongodb://localhost/lastsex';
mongoose.connect(url);

/*
mongoose.connect('mongodb://localhost/lastsex', function(){
	console.log('mongodb connected')
});
*/

module.exports = mongoose;