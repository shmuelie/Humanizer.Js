var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Humanizer;
(function (Humanizer) {
    var Configuration;
    (function (Configuration) {
        var NumberToWordsConverterRegistry = (function (_super) {
            __extends(NumberToWordsConverterRegistry, _super);
            function NumberToWordsConverterRegistry() {
                _super.call(this, new Humanizer.Localisation.NumberToWords.DefaultNumberToWordsConverter());
                this.register("en", new Humanizer.Localisation.NumberToWords.EnglishNumberToWordsConverter());
                this.register("ar", new Humanizer.Localisation.NumberToWords.ArabicNumberToWordsConverter());
                this.register("es", new Humanizer.Localisation.NumberToWords.SpanishNumberToWordsConverter());
            }
            return NumberToWordsConverterRegistry;
        })(Configuration.LocaliserRegistry);
        Configuration.NumberToWordsConverterRegistry = NumberToWordsConverterRegistry;
    })(Configuration = Humanizer.Configuration || (Humanizer.Configuration = {}));
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=NumberToWordsConverterRegistry.js.map