var Humanizer;
(function (Humanizer) {
    var Localisation;
    (function (Localisation) {
        var Ordinalizers;
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
        })(Ordinalizers = Localisation.Ordinalizers || (Localisation.Ordinalizers = {}));
    })(Localisation = Humanizer.Localisation || (Humanizer.Localisation = {}));
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=EnglishOrdinalizer.js.map