var Humanizer;
(function (Humanizer) {
    var Configuration;
    (function (Configuration) {
        var Configurator;
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
        })(Configurator = Configuration.Configurator || (Configuration.Configurator = {}));
    })(Configuration = Humanizer.Configuration || (Humanizer.Configuration = {}));
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=configurator.js.map