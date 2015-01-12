var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Humanizer;
(function (Humanizer) {
    (function (Localisation) {
        (function (NumberToWords) {
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
        })(Localisation.NumberToWords || (Localisation.NumberToWords = {}));
        var NumberToWords = Localisation.NumberToWords;
    })(Humanizer.Localisation || (Humanizer.Localisation = {}));
    var Localisation = Humanizer.Localisation;
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=DefaultNumberToWordsConverter.js.map
