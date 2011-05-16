var places = module.exports = function(key) {
	this.key = key;
};

function call(path, params, callback) {
	var request = require('./request');
	var self = this;
  request(path, params,
  function(error, data) {
      if (error) {
          callback(error, null);
      } else if (data.error) {
          callback(data.error, null);
      } else {
          callback(null, data);
      }
  });
}
//location=-33.8670522,151.1957362&radius=500&types=food&name=harbour&sensor=false&key=AIzaSyAiFpFd85eMtfbvmVNEYuNds5TEF9FjIPI
places.prototype.search = function(lat, lng, radius, sensor, callback) {
	var self = this;
	var params = {
		location: lat.toString() + ',' + lng.toString(),
		radius: radius,
		sensor: sensor, 
		key: self.key
	};
	call('/search/json', params, callback);
};

places.prototype.detail = function(callback) {
	
};


