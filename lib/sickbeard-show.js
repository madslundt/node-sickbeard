(function() {
    var SickBeardShow = function(delegate) {
        this.delegate = delegate;
    };

    SickBeardShow.prototype.show = function(args) {
        return this.delegate.cmd('show', args).then(function(r) {
            return (r.result == 'success' ? r.data : false);
        });
    };

    SickBeardShow.prototype.addexisting = function(args) {
        if (args instanceof Array) {
            args.flatten_folders = typeof args.flatten_folders !== 'undefined' ? args.flatten_folders : '';
            args.initial = typeof args.initial !== 'undefined' ? args.initial : '';
            args.archive = typeof args.archive !== 'undefined' ? args.archive : '';
        }

        return this.delegate.cmd('show.addexisting', args).then(function(r) {
            return (r.result == 'success' ? r.data : false);
        });
    };

    SickBeardShow.prototype.add = function(args) {
        if (args instanceof Array) {
            args.location = typeof args.location !== 'undefined' ? args.location : '';
            args.lang = typeof args.lang !== 'undefined' ? args.lang : 'en';
            args.flatten_folders = typeof args.flatten_folders !== 'undefined' ? args.flatten_folders : '';
            args.status = typeof args.status !== 'undefined' ? args.status : '';
            args.initial = typeof args.initial !== 'undefined' ? args.initial : '';
            args.archive = typeof args.archive !== 'undefined' ? args.archive : '';
        }

        return this.delegate.cmd('show.add', args).then(function(r) {
            return r.result;
        });
    };

    SickBeardShow.prototype.cache = function(args) {
        return this.delegate.cmd('show.cache', args).then(function(r) {
            return r.data;
        });
    };

    SickBeardShow.prototype.delete = function(args) {
        return this.delegate.cmd('show.delete', args).then(function(r) {
            return r.data;
        });
    };

    SickBeardShow.prototype.getbanner = function(args) {
        return this.delegate.cmd('show.getbanner', args).then(function(r) {
            return r;
        });
    };

    SickBeardShow.prototype.getposter = function(args) {
        return this.delegate.cmd('show.getposter', args).then(function(r) {
            return r;
        });
    };

    SickBeardShow.prototype.getquality = function(args) {
        return this.delegate.cmd('show.getquality', args).then(function(r) {
            return (r.result == 'success' ? r.data : false);
        });
    };

    SickBeardShow.prototype.pause = function(args) {
        if (args instanceof Array) {
            args.pause = typeof args.pause !== 'undefined' ? args.pause : '0';
        }

        return this.delegate.cmd('show.pause', args).then(function(r) {
            return (r.result == 'success' ? r.message : false);
        });
    };

    SickBeardShow.prototype.refresh = function(args) {
        return this.delegate.cmd('show.refresh', args).then(function(r) {
            return (r.result == 'success' ? r.message : false);
        });
    };

    SickBeardShow.prototype.seasonlist = function(args) {
        return this.delegate.cmd('show.seasonlist', args).then(function(r) {
            return (r.result == 'success' ? r.data : false);
        });
    };

    SickBeardShow.prototype.seasons = function(args) {
        if (args instanceof Array) {
            args.season = typeof args.season !== 'undefined' ? args.season : '';
        }

        return this.delegate.cmd('show.seasons', args).then(function(r) {
            return (r.result == 'success' ? r.data : false);
        });
    };

    SickBeardShow.prototype.setquality = function(args) {
        if (args instanceof Array) {
            args.initial = typeof args.initial !== 'undefined' ? args.initial : '';
            args.archive = typeof args.archive !== 'undefined' ? args.archive : '';

        }

        return this.delegate.cmd('show.setquality', args).then(function(r) {
            return (r.result == 'success' ? r.message : false);
        });
    };

    SickBeardShow.prototype.stats = function(args) {
        return this.delegate.cmd('show.stats', args).then(function(r) {
            return (r.result == 'success' ? r.data : false);
        });
    };

    SickBeardShow.prototype.update = function(args) {
        return this.delegate.cmd('show.update', args).then(function(r) {
            return (r.result == 'success' ? r.message : false);
        });
    };

    module.exports = SickBeardShow;
})();