var Humanizer;
(function (Humanizer) {
    (function (Configuration) {
        var LocaliserRegistry = (function () {
            function LocaliserRegistry(_default) {
                var _this = this;
                this.findLocaliser = function (culture) {
                    var localiser = _this.localizer[culture];
                    if (localiser !== undefined) {
                        return localiser;
                    }
                    return _this.defaultLocalizer;
                };
                this.localizer = {};
                this.defaultLocalizer = function (culture) {
                    return _default;
                };
            }
            LocaliserRegistry.prototype.resolveForCulture = function (culture) {
                if (typeof culture === "undefined") { culture = Humanizer.Resources.getCurrentCulture(); }
                return this.findLocaliser(culture)(culture);
            };

            LocaliserRegistry.prototype.register = function () {
                var culture = arguments[0];
                if (typeof arguments[1] === "function") {
                    var func = arguments[1];
                    this.localizer[culture] = func;
                } else {
                    var localiser = arguments[1];
                    this.localizer[culture] = function (c) {
                        return localiser;
                    };
                }
            };
            return LocaliserRegistry;
        })();
        Configuration.LocaliserRegistry = LocaliserRegistry;
    })(Humanizer.Configuration || (Humanizer.Configuration = {}));
    var Configuration = Humanizer.Configuration;
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=localiserRegistry.js.map
