(function() {
    var SickBeardShows = function(delegate) {
        this.delegate = delegate;
    };

	SickBeardShows.prototype.shows = function(args) {
        if (args instanceof Array) {
            args.sort = typeof args.sort !== 'undefined' ? args.sort : 'id';
            args.paused = typeof args.paused !== 'undefined' ? args.paused : '';

            return this.delegate.cmd('shows', args).then(function(r) {
	            return (r.result == 'success' ? r.data : false);
	        });
        } else {
        	return this.delegate.cmd('shows').then(function(r) {
            return (r.result == 'success' ? r.data : false);
        });
        }
        
    };

    SickBeardShows.prototype.stats = function(args) {
        return this.delegate.cmd('shows').then(function(r) {
            return (r.result == 'success' ? r.data : false);
        });
    };

    module.exports = SickBeardShows;
})();