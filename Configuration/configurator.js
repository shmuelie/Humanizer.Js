var Humanizer;
(function (Humanizer) {
    (function (Configuration) {
        (function (Configurator) {
            "use strict";

            var formatter = new Configuration.FormatterRegistry();
            var ordinalizers = new Configuration.OrdinalizerRegistry();
            var collections = new Configuration.CollectionFormatterRegistry();

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
        })(Configuration.Configurator || (Configuration.Configurator = {}));
        var Configurator = Configuration.Configurator;
    })(Humanizer.Configuration || (Humanizer.Configuration = {}));
    var Configuration = Humanizer.Configuration;
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=configurator.js.map
