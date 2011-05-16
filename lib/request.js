var querystring = require('querystring');
var https = require('https');
var URL = require('url');

//https://maps.googleapis.com/maps/api/place/search/json?location=-33.8670522,151.1957362&radius=500&types=food&name=harbour&sensor=false&key=AIzaSyAiFpFd85eMtfbvmVNEYuNds5TEF9FjIPI
//https://maps.googleapis.com/maps/api/place/details/json?reference=CmRYAAAAciqGsTRX1mXRvuXSH2ErwW-jCINE1aLiwP64MCWDN5vkXvXoQGPKldMfmdGyqWSpm7BEYCgDm-iv7Kc2PF7QA7brMAwBbAcqMr5i1f4PwTpaovIZjysCEZTry8Ez30wpEhCNCXpynextCld2EBsDkRKsGhSLayuRyFsex6JA6NPh9dyupoTH3g&sensor=true&key=AIzaSyAiFpFd85eMtfbvmVNEYuNds5TEF9FjIPI

var google_path = 'https://maps.googleapis.com/maps/api/place';

function get(path, params, callback) {
	path = path[0] === '/' ? path: '/' + path;
	var url = google_path + path + "?" + querystring.stringify(params);
	send('GET', url, function(err, data){
		callback(err, data);
	});
}

function send(method, url, callback) {
	var parsedUrl = URL.parse(url, true);
	var result = '';
	var options = {
		host: parsedUrl.host,
		port: parsedUrl.protocol === 'https:' ? 443 : 80,
		path: parsedUrl.pathname + '?' + querystring.stringify(parsedUrl.query),
		method: method
	};
	
	console.log(options);
	
	var req = https.request(options, function(res){
		res.on('data', function(chunk){
			result += chunk;
		});
		res.on('end', function(){
			if(res.statusCode !== 200) callback({statusCode: res.statusCode, data: result}, null);
			else callback(null, result);
		});
	});
	req.end();
}

if (typeof module == "object" && typeof require == "function") {
	module.exports = get;
}
