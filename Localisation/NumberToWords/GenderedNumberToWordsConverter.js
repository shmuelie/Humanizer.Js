var Humanizer;
(function (Humanizer) {
    var Localisation;
    (function (Localisation) {
        var NumberToWords;
        (function (NumberToWords) {
            "use strict";
            var GenderedNumberToWordsConverter = (function () {
                function GenderedNumberToWordsConverter(defaultGender) {
                    if (defaultGender === void 0) { defaultGender = 0 /* Masculine */; }
                    this.defaultGender = defaultGender;
                }
                GenderedNumberToWordsConverter.prototype.convert = function () {
                    if (arguments.length === 1) {
                        return this.convert_number(arguments[0]);
                    }
                    return this.convert_number_grammaticalGender(arguments[0], arguments[1]);
                };
                GenderedNumberToWordsConverter.prototype.convertToOrdinal = function () {
                    if (arguments.length === 1) {
                        return this.convertToOrdinal_number(arguments[0]);
                    }
                    return this.convertToOrdinal_number_grammaticalGender(arguments[0], arguments[1]);
                };
                GenderedNumberToWordsConverter.prototype.convert_number = function (num) {
                    return this.convert_number_grammaticalGender(num, this.defaultGender);
                };
                GenderedNumberToWordsConverter.prototype.convert_number_grammaticalGender = function (num, gender) {
                    throw new Error("Abstract");
                };
                GenderedNumberToWordsConverter.prototype.convertToOrdinal_number = function (num) {
                    return this.convertToOrdinal_number_grammaticalGender(num, this.defaultGender);
                };
                GenderedNumberToWordsConverter.prototype.convertToOrdinal_number_grammaticalGender = function (num, gender) {
                    throw new Error("Abstract");
                };
                return GenderedNumberToWordsConverter;
            })();
            NumberToWords.GenderedNumberToWordsConverter = GenderedNumberToWordsConverter;
        })(NumberToWords = Localisation.NumberToWords || (Localisation.NumberToWords = {}));
    })(Localisation = Humanizer.Localisation || (Humanizer.Localisation = {}));
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=GenderedNumberToWordsConverter.js.map