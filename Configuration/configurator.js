var Humanizer;
(function (Humanizer) {
    (function (Configuration) {
        (function (Configurator) {
            "use strict";

            var formatter = new Configuration.FormatterRegistry();
            var ordinalizers = new Configuration.OrdinalizerRegistry();

            function getFormatter(culture) {
                return formatter.resolveForCulture(culture);
            }
            Configurator.getFormatter = getFormatter;

            function getOrdinalizer() {
                return ordinalizers.resolveForCulture(Humanizer.Resources.getCurrentCulture());
            }
            Configurator.getOrdinalizer = getOrdinalizer;
        })(Configuration.Configurator || (Configuration.Configurator = {}));
        var Configurator = Configuration.Configurator;
    })(Humanizer.Configuration || (Humanizer.Configuration = {}));
    var Configuration = Humanizer.Configuration;
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=configurator.js.map
