var Humanizer;
(function (Humanizer) {
    (function (Configuration) {
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

            function getNumberToWordsConverter() {
                return numberToWords.resolveForCulture(Humanizer.Resources.getCurrentCulture());
            }
            Configurator.getNumberToWordsConverter = getNumberToWordsConverter;

            Configurator.dateHumanizeStrategy = new Humanizer.DateHumanizeStrategy.DefaultDateHumanizeStrategy();
        })(Configuration.Configurator || (Configuration.Configurator = {}));
        var Configurator = Configuration.Configurator;
    })(Humanizer.Configuration || (Humanizer.Configuration = {}));
    var Configuration = Humanizer.Configuration;
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=Configurator.js.map
