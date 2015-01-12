var Humanizer;
(function (Humanizer) {
    (function (Localisation) {
        (function (NumberToWords) {
            "use strict";

            var GenderlessNumberToWordsConverter = (function () {
                function GenderlessNumberToWordsConverter() {
                }
                GenderlessNumberToWordsConverter.prototype.convert = function () {
                    if (arguments.length === 1) {
                        return this.convert_number(arguments[0]);
                    }
                    return this.convert_number_grammaticalGender(arguments[0], arguments[1]);
                };

                GenderlessNumberToWordsConverter.prototype.convertToOrdinal = function () {
                    if (arguments.length === 1) {
                        return this.convertToOrdinal_number(arguments[0]);
                    }
                    return this.convertToOrdinal_number_grammaticalGender(arguments[0], arguments[1]);
                };

                GenderlessNumberToWordsConverter.prototype.convert_number = function (num) {
                    throw new Error("Abstract");
                };

                GenderlessNumberToWordsConverter.prototype.convert_number_grammaticalGender = function (num, gender) {
                    return this.convert_number(num);
                };

                GenderlessNumberToWordsConverter.prototype.convertToOrdinal_number = function (num) {
                    throw new Error("Abstract");
                };

                GenderlessNumberToWordsConverter.prototype.convertToOrdinal_number_grammaticalGender = function (num, gender) {
                    return this.convertToOrdinal_number(num);
                };
                return GenderlessNumberToWordsConverter;
            })();
            NumberToWords.GenderlessNumberToWordsConverter = GenderlessNumberToWordsConverter;
        })(Localisation.NumberToWords || (Localisation.NumberToWords = {}));
        var NumberToWords = Localisation.NumberToWords;
    })(Humanizer.Localisation || (Humanizer.Localisation = {}));
    var Localisation = Humanizer.Localisation;
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=GenderlessNumberToWordsConverter.js.map
