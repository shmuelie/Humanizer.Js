var Humanizer;
(function (Humanizer) {
    (function (Configuration) {
        (function (Configurator) {
            var formatter = new Configuration.FormatterRegistry();

            function getFormatter(culture) {
                return formatter.resolveForCulture(culture);
            }
            Configurator.getFormatter = getFormatter;
        })(Configuration.Configurator || (Configuration.Configurator = {}));
        var Configurator = Configuration.Configurator;
    })(Humanizer.Configuration || (Humanizer.Configuration = {}));
    var Configuration = Humanizer.Configuration;
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=configurator.js.map
