var Humanizer;
(function (Humanizer) {
    var DateHumanizeStrategy;
    (function (DateHumanizeStrategy) {
        "use strict";
        /**
         * The default 'distance of time' -> words calculator.
         */
        var DefaultDateHumanizeStrategy = (function () {
            function DefaultDateHumanizeStrategy() {
            }
            /**
             * Calculates the distance of time in words between two provided dates
             */
            DefaultDateHumanizeStrategy.prototype.humanize = function (input, comparisonBase, culture) {
                return DateHumanizeStrategy.DateTimeHumanizeAlgorithms.defaultHumanize(input, comparisonBase, culture);
            };
            return DefaultDateHumanizeStrategy;
        })();
        DateHumanizeStrategy.DefaultDateHumanizeStrategy = DefaultDateHumanizeStrategy;
    })(DateHumanizeStrategy = Humanizer.DateHumanizeStrategy || (Humanizer.DateHumanizeStrategy = {}));
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=DefaultDateHumanizeStrategy.js.map