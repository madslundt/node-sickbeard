(function() {
    var request = require('request');
    var URL     = require('url');
    var util    = require('util');
    var QS      = require('querystring');
    var Q       = require('q');

    var SickBeardEpisode = require('./sickbeard-episode');
    var SickBeardHistory = require('./sickbeard-history');
    var SickBeardShow = require('./sickbeard-show');
    var SickBeardShows = require('./sickbeard-shows');

    var SickBeard = function(config) {
        this.apikey = config.apikey;
        this.url = config.url;
        this.debug = config.debug === true;
        
        this.invalid = false;

        this.episode = new SickBeardEpisode(this);
        this.history = new SickBeardHistory(this);
        this.show = new SickBeardShow(this);
        this.shows = new SickBeardShows(this);

        this.available().then(function(r) {
            if (r === null) {
                util.log('SickBeard available failed');
                return false;
            }
            if (debug)
                util.log('SickBeard available: ' + r);
        }, function(error) {
            util.log('SickBeard available failed: ' + error);
            this.invalid = true;
        });
    };

    SickBeard.prototype.cmd = function(command, args) {
        if (this.invalid)
        {
            util.log('SickBeard API invalid because of connection/API key issues');
            return false;
        }

        if (this.url.substring(0, 4) != "http") {
            this.url = 'http://' + this.url;
        }

        if (this.url[this.url.length-1] != '/')
            this.url += '/';

        // build url for request
        var url = this.url + 'api/' + this.apikey + '/?cmd=' + command;

        // Extra parameters
        if (args)
            url += '&' + QS.stringify(args);

        if (this.debug)
            util.log("Retrieving url \'" + url + "\'");

        // perform request
        var defer = Q.defer();
        request.get(url, function(error, response, body) {
            if (!error && response.headers['content-type'].indexOf('application/json') != -1) {
                body = JSON.parse(body);
            }
            if (error) {
                this.invalid = true;
                util.log('Connection failed: ' + error);
                defer.reject(error);
                return false;
            }
            defer.resolve(body);
        });

        return defer.promise;
    };

    SickBeard.prototype.messages = function() {
        return this.cmd('sb.getmessages').then(function(r) {
            if (r == 'success') {
                return r.data;
            } else {
                return false;
            }
        });
    };

    SickBeard.prototype.available = function() {
        return this.cmd('sb.ping').then(function(r) {
            return r.result == 'success' ? true : false;
        });
    };

    SickBeard.prototype.restart = function() {
        return this.cmd('sb.restart').then(function(r) {
            return r.result == 'success' ? true : false;
        });
    };

    SickBeard.prototype.shutdown = function() {
        return this.cmd('sb.shutdown').then(function(r) {
            return r.result == 'success' ? true : false;
        });
    };

    SickBeard.prototype.version = function() {
        return this.cmd('sb').then(function(r) {
            return r.data.sb_version;
        });
    };

    SickBeard.prototype.api_version = function() {
        return this.cmd('sb').then(function(r) {
            return r.data.api_version;
        });
    };

    module.exports = SickBeard;
})();