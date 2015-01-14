var Humanizer;
(function (Humanizer) {
    Date.prototype.humanize = function (dateToCompareAgainst, culture) {
        if (typeof dateToCompareAgainst === "undefined") { dateToCompareAgainst = new Date(); }
        if (typeof culture === "undefined") { culture = Humanizer.Resources.getCurrentCulture(); }
        return Humanizer.Configuration.Configurator.dateHumanizeStrategy.humanize(this, dateToCompareAgainst, culture);
    };
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=dateExtensions.js.map
