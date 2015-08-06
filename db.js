var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lastsex', function(){
	console.log('mongodb connected')
});

module.exports = mongoose;