(function() {
    var SickBeardHistory = function(delegate) {
        this.delegate = delegate;
    };

    SickBeardHistory.prototype.history = function(args) {
        if (args instanceof Array) {
            args.limit = typeof args.limit !== 'undefined' ? args.limit : 100;
            args.type = typeof args.type !== 'undefined' ? args.type : '';
        }
        return this.delegate.cmd('history', args).then(function(r) {
            return (r.result == 'success' ? r.data : false);
        });
    };

    SickBeardHistory.prototype.future = function(args) {
        if (args instanceof Array) {
            args.sort = typeof args.sort !== 'undefined' ? args.sort : 'date';
            args.type = typeof args.type !== 'undefined' ? args.type : '';
            args.paused = typeof args.paused !== 'undefined' ? args.paused : '';
        }

        return this.delegate.cmd('future', args).then(function(r) {
            return (r.result == 'success' ? r.data : false);
        });
    };

    SickBeardHistory.prototype.clear = function() {
        return this.delegate.cmd('history.clear').then(function(r) {
            return r.result;
        });
    };

    SickBeardHistory.prototype.trim = function() {

        return this.delegate.cmd('history.trim').then(function(r) {
            return r.result;
        });
    };

    SickBeardHistory.prototype.future = function(args) {
        if (args instanceof Array) {
            args.min_level = typeof args.min_level !== 'undefined' ? args.min_level : 'error';
        }

        return this.delegate.cmd('logs', args).then(function(r) {
            return (r.result == 'success' ? r.data : false);
        });
    };

    module.exports = SickBeardHistory;
})();