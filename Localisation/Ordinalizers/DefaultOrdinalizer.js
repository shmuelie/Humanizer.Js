var Humanizer;
(function (Humanizer) {
    (function (Localisation) {
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
        })(Localisation.Ordinalizers || (Localisation.Ordinalizers = {}));
        var Ordinalizers = Localisation.Ordinalizers;
    })(Humanizer.Localisation || (Humanizer.Localisation = {}));
    var Localisation = Humanizer.Localisation;
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=DefaultOrdinalizer.js.map
