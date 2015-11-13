var Humanizer;
(function (Humanizer) {
    var DateHumanizeStrategy;
    (function (DateHumanizeStrategy) {
        "use strict";
        var DefaultDateHumanizeStrategy = (function () {
            function DefaultDateHumanizeStrategy() {
            }
            DefaultDateHumanizeStrategy.prototype.humanize = function (input, comparisonBase, culture) {
                return DateHumanizeStrategy.DateTimeHumanizeAlgorithms.defaultHumanize(input, comparisonBase, culture);
            };
            return DefaultDateHumanizeStrategy;
        })();
        DateHumanizeStrategy.DefaultDateHumanizeStrategy = DefaultDateHumanizeStrategy;
    })(DateHumanizeStrategy = Humanizer.DateHumanizeStrategy || (Humanizer.DateHumanizeStrategy = {}));
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=DefaultDateHumanizeStrategy.js.map