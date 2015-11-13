var Humanizer;
(function (Humanizer) {
    var DateHumanizeStrategy;
    (function (DateHumanizeStrategy) {
        "use strict";
        var PrecisionDateHumanizeStrategy = (function () {
            function PrecisionDateHumanizeStrategy(precision) {
                if (precision === void 0) { precision = 0.75; }
                this.precision = precision;
            }
            PrecisionDateHumanizeStrategy.prototype.humanize = function (input, comparisonBase, culture) {
                return DateHumanizeStrategy.DateTimeHumanizeAlgorithms.precisionHumanize(input, comparisonBase, this.precision, culture);
            };
            return PrecisionDateHumanizeStrategy;
        })();
        DateHumanizeStrategy.PrecisionDateHumanizeStrategy = PrecisionDateHumanizeStrategy;
    })(DateHumanizeStrategy = Humanizer.DateHumanizeStrategy || (Humanizer.DateHumanizeStrategy = {}));
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=PrecisionDateHumanizeStrategy.js.map