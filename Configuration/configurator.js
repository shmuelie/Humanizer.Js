var Humanizer;
(function (Humanizer) {
    var Configuration;
    (function (Configuration) {
        var Configurator;
        (function (Configurator) {
            "use strict";
            var formatter = new Configuration.FormatterRegistry();
            function getFormatter(culture) {
                return formatter.resolveForCulture(culture);
            }
            Configurator.getFormatter = getFormatter;
        })(Configurator = Configuration.Configurator || (Configuration.Configurator = {}));
    })(Configuration = Humanizer.Configuration || (Humanizer.Configuration = {}));
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=configurator.js.map