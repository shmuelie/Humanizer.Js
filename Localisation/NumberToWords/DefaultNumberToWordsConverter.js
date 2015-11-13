var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Humanizer;
(function (Humanizer) {
    var Localisation;
    (function (Localisation) {
        var NumberToWords;
        (function (NumberToWords) {
            "use strict";
            var DefaultNumberToWordsConverter = (function (_super) {
                __extends(DefaultNumberToWordsConverter, _super);
                function DefaultNumberToWordsConverter() {
                    _super.apply(this, arguments);
                }
                DefaultNumberToWordsConverter.prototype.convert_number = function (num) {
                    return num.toString();
                };
                DefaultNumberToWordsConverter.prototype.convertToOrdinal_number = function (num) {
                    return num.toString();
                };
                return DefaultNumberToWordsConverter;
            })(NumberToWords.GenderlessNumberToWordsConverter);
            NumberToWords.DefaultNumberToWordsConverter = DefaultNumberToWordsConverter;
        })(NumberToWords = Localisation.NumberToWords || (Localisation.NumberToWords = {}));
    })(Localisation = Humanizer.Localisation || (Humanizer.Localisation = {}));
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=DefaultNumberToWordsConverter.js.map