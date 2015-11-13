var Humanizer;
(function (Humanizer) {
    var DateHumanizeStrategy;
    (function (DateHumanizeStrategy) {
        "use strict";
        /**
         * Precision-based calculator for distance between two times
         */
        var PrecisionDateHumanizeStrategy = (function () {
            /**
             * Constructs a precision-based calculator for distance of time with default precision 0.75.
             * @param {Number} precision precision of approximation, if not provided  0.75 will be used as a default precision.
             */
            function PrecisionDateHumanizeStrategy(precision) {
                if (precision === void 0) { precision = 0.75; }
                this.precision = precision;
            }
            /**
             * Returns localized & humanized distance of time between two dates; given a specific precision.
             */
            PrecisionDateHumanizeStrategy.prototype.humanize = function (input, comparisonBase, culture) {
                return DateHumanizeStrategy.DateTimeHumanizeAlgorithms.precisionHumanize(input, comparisonBase, this.precision, culture);
            };
            return PrecisionDateHumanizeStrategy;
        })();
        DateHumanizeStrategy.PrecisionDateHumanizeStrategy = PrecisionDateHumanizeStrategy;
    })(DateHumanizeStrategy = Humanizer.DateHumanizeStrategy || (Humanizer.DateHumanizeStrategy = {}));
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=PrecisionDateHumanizeStrategy.js.map