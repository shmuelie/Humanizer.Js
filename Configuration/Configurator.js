var Humanizer;
(function (Humanizer) {
    var Configuration;
    (function (Configuration) {
        var Configurator;
        (function (Configurator) {
            "use strict";
            var formatter = new Configuration.FormatterRegistry();
            var ordinalizers = new Configuration.OrdinalizerRegistry();
            var collections = new Configuration.CollectionFormatterRegistry();
            var numberToWords = new Configuration.NumberToWordsConverterRegistry();
            function getFormatter(culture) {
                return formatter.resolveForCulture(culture);
            }
            Configurator.getFormatter = getFormatter;
            function getOrdinalizer() {
                return ordinalizers.resolveForCulture(Humanizer.Resources.getCurrentCulture());
            }
            Configurator.getOrdinalizer = getOrdinalizer;
            function getCollectionFormatters() {
                return collections.resolveForCulture(Humanizer.Resources.getCurrentCulture());
            }
            Configurator.getCollectionFormatters = getCollectionFormatters;
            function getNumberToWordsConverter(culture) {
                return numberToWords.resolveForCulture(culture);
            }
            Configurator.getNumberToWordsConverter = getNumberToWordsConverter;
            Configurator.dateHumanizeStrategy = new Humanizer.DateHumanizeStrategy.DefaultDateHumanizeStrategy();
        })(Configurator = Configuration.Configurator || (Configuration.Configurator = {}));
    })(Configuration = Humanizer.Configuration || (Humanizer.Configuration = {}));
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=Configurator.js.map