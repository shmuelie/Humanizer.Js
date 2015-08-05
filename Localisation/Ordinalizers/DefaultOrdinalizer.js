var Humanizer;
(function (Humanizer) {
    var Localisation;
    (function (Localisation) {
        var Ordinalizers;
        (function (Ordinalizers) {
            "use strict";
            var DefaultOrdinalizer = (function () {
                function DefaultOrdinalizer() {
                }
                DefaultOrdinalizer.prototype.convert = function () {
                    return arguments[1];
                };
                return DefaultOrdinalizer;
            })();
            Ordinalizers.DefaultOrdinalizer = DefaultOrdinalizer;
        })(Ordinalizers = Localisation.Ordinalizers || (Localisation.Ordinalizers = {}));
    })(Localisation = Humanizer.Localisation || (Humanizer.Localisation = {}));
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=DefaultOrdinalizer.js.map