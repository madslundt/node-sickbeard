(function() {
    var SickBeardEpisode = function(delegate) {
        this.delegate = delegate;
    };

    SickBeardEpisode.prototype.get = function(args) {
        if (args instanceof Array) {
            args.full_path = typeof args.full_path !== 'undefined' ? args.full_path : 0;
        }
        return this.delegate.cmd('episode', args).then(function(r) {
            return (r.result == 'success' ? r.data : false);
        });
    };

    SickBeardEpisode.prototype.search = function(args) {
        return this.delegate.cmd('episode.search', args).then(function(r) {
            return (r.result == 'success' ? r.data : false);
        });
    };

    SickBeardEpisode.prototype.set = function(args) {
        if (args instanceof Array) {
            args.episode = typeof args.episode !== 'undefined' ? args.episode : '';
            args.force = typeof args.force !== 'undefined' ? args.force : 0;
        }
        return this.delegate.cmd('episode', args).then(function(r) {
            return (r.result == 'success' ? r.data : false);
        });
    };

    module.exports = SickBeardEpisode;
})();