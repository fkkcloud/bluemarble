var ws = require('ws');
var _ = require('lodash');
var clients = [];

// http server에 연결시키기 위한 웹소켓 서버 생성
exports.connect = function(server){
	var wss = new ws.Server({server: server});

	// connection 이벤트가 호출될때 일어날 콜백함수 등
	wss.on('connection', function(ws){
		clients.push(ws);

		// exports.broadcast('new client joined');

		ws.on('close', function(){
			_.remove(clients, ws);
		});
	});
};

exports.broadcast = function(topic, data){
	var json = JSON.stringify({topic: topic, data: data});
	clients.forEach(function(client){
		client.send(json);
	});
};