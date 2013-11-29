node-sickbeard
================
Node interface for [SickBeard](http://www.sickbeard.com/).

**Not properly tested yet**

Work In Progress.

Usage example
================
```javascript
var SickBeard = require('node-sickbeard');

var sb = new SickBeard({
	url: '<host:port>', 
	apikey: '<APIKEY>', 
	debug: true
	});

sb.version().then(function(r) {
	console.log(r);
});
```
