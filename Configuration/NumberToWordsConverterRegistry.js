var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Humanizer;
(function (Humanizer) {
    (function (Configuration) {
        var NumberToWordsConverterRegistry = (function (_super) {
            __extends(NumberToWordsConverterRegistry, _super);
            function NumberToWordsConverterRegistry() {
                _super.call(this, new Humanizer.Localisation.NumberToWords.DefaultNumberToWordsConverter());
                this.register("en", new Humanizer.Localisation.NumberToWords.EnglishNumberToWordsConverter());
                this.register("ar", new Humanizer.Localisation.NumberToWords.ArabicNumberToWordsConverter());
            }
            return NumberToWordsConverterRegistry;
        })(Configuration.LocaliserRegistry);
        Configuration.NumberToWordsConverterRegistry = NumberToWordsConverterRegistry;
    })(Humanizer.Configuration || (Humanizer.Configuration = {}));
    var Configuration = Humanizer.Configuration;
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=NumberToWordsConverterRegistry.js.map
