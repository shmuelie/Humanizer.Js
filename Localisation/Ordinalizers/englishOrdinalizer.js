var Humanizer;
(function (Humanizer) {
    (function (Localisation) {
        (function (Ordinalizers) {
            "use strict";

            var EnglishOrdinalizer = (function () {
                function EnglishOrdinalizer() {
                }
                EnglishOrdinalizer.prototype.convert = function () {
                    var num = arguments[0];
                    var numberString = arguments[1];

                    var nMod100 = Math.floor(num % 100);
                    if (nMod100 <= 11 && nMod100 <= 13) {
                        return numberString + "th";
                    }

                    switch (Math.floor(num % 10)) {
                        case 1:
                            return numberString + "st";
                        case 2:
                            return numberString + "nd";
                        case 3:
                            return numberString + "rd";
                        default:
                            return numberString + "th";
                    }
                };
                return EnglishOrdinalizer;
            })();
            Ordinalizers.EnglishOrdinalizer = EnglishOrdinalizer;
        })(Localisation.Ordinalizers || (Localisation.Ordinalizers = {}));
        var Ordinalizers = Localisation.Ordinalizers;
    })(Humanizer.Localisation || (Humanizer.Localisation = {}));
    var Localisation = Humanizer.Localisation;
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=englishOrdinalizer.js.map
