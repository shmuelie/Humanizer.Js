var Humanizer;
(function (Humanizer) {
    Date.prototype.humanize = function (dateToCompareAgainst, culture) {
        if (dateToCompareAgainst === void 0) { dateToCompareAgainst = new Date(); }
        if (culture === void 0) { culture = Humanizer.Resources.getCurrentCulture(); }
        return Humanizer.Configuration.Configurator.dateHumanizeStrategy.humanize(this, dateToCompareAgainst, culture);
    };
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=dateExtensions.js.map