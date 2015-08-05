var Humanizer;
(function (Humanizer) {
    var Configuration;
    (function (Configuration) {
        "use strict";
        var LocaliserRegistry = (function () {
            function LocaliserRegistry(_default) {
                this.localizer = {};
                this.defaultLocalizer = function (culture) {
                    return _default;
                };
            }
            LocaliserRegistry.prototype.resolveForCulture = function (culture) {
                if (culture === void 0) { culture = Humanizer.Resources.getCurrentCulture(); }
                return this.findLocaliser(culture)(culture);
            };
            LocaliserRegistry.prototype.register = function () {
                var culture = arguments[0];
                if (typeof arguments[1] === "function") {
                    var func = arguments[1];
                    this.localizer[culture] = func;
                }
                else {
                    var localiser = arguments[1];
                    this.localizer[culture] = function (c) { return localiser; };
                }
            };
            LocaliserRegistry.prototype.findLocaliser = function (culture) {
                var localiser = this.localizer[culture];
                if (localiser !== undefined) {
                    return localiser;
                }
                culture = culture.substr(0, 2);
                localiser = this.localizer[culture];
                if (localiser !== undefined) {
                    return localiser;
                }
                return this.defaultLocalizer;
            };
            return LocaliserRegistry;
        })();
        Configuration.LocaliserRegistry = LocaliserRegistry;
    })(Configuration = Humanizer.Configuration || (Humanizer.Configuration = {}));
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=LocaliserRegistry.js.map