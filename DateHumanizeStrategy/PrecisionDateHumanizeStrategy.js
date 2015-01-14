var Humanizer;
(function (Humanizer) {
    (function (DateHumanizeStrategy) {
        "use strict";

        var MILLIS_PER_SECOND = 1000;
        var MILLIS_PER_MINUTE = MILLIS_PER_SECOND * 60;
        var MILLIS_PER_HOUR = MILLIS_PER_MINUTE * 60;
        var MILLIS_PER_DAY = MILLIS_PER_HOUR * 24;

        var PrecisionDateHumanizeStrategy = (function () {
            function PrecisionDateHumanizeStrategy(precision) {
                if (typeof precision === "undefined") { precision = 0.75; }
                this.precision = precision;
            }
            PrecisionDateHumanizeStrategy.prototype.humanize = function (input, comparisonBase, culture) {
                var tense = input > comparisonBase ? 0 /* Future */ : 1 /* Past */;
                var ts = Math.abs(comparisonBase.getTime() - input.getTime());

                var days = ts / MILLIS_PER_DAY;
                var weeks = Math.floor(days / 7);
                var daysInWeek = days % 7;
                ts = ts - ((weeks * 7 + daysInWeek) * MILLIS_PER_DAY);
                var hours = Math.floor(ts / MILLIS_PER_HOUR);
                ts = ts - (hours * MILLIS_PER_HOUR);
                var minutes = Math.floor(ts / MILLIS_PER_MINUTE);
                ts = ts - (minutes * MILLIS_PER_MINUTE);
                var seconds = Math.floor(ts / MILLIS_PER_SECOND);
                var milliseconds = ts - (seconds * MILLIS_PER_SECOND);
                var years = 0;
                var months = 0;

                if (milliseconds >= 999 * this.precision) {
                    seconds++;
                }
                if (seconds >= 59 * this.precision) {
                    minutes++;
                }
                if (minutes >= 59 * this.precision) {
                    hours++;
                }
                if (hours >= 23 * this.precision) {
                    days++;
                }

                if (days >= 30 * this.precision && days <= 30) {
                    months = 1;
                }
                if (days > 31 && days < 365 * this.precision) {
                    var factor = Math.floor(days / 30);
                    var maxMonths = Math.ceil(days / 30);
                    months = (days >= 30 * (factor + this.precision)) ? maxMonths : maxMonths - 1;
                }

                if (days >= 365 * this.precision && days <= 366) {
                    years = 1;
                }
                if (days > 365) {
                    var factor = Math.floor(days / 365);
                    var maxMonths = Math.ceil(days / 365);
                    years = (days >= 365 * (factor + this.precision)) ? maxMonths : maxMonths - 1;
                }

                var formatter = Humanizer.Configuration.Configurator.getFormatter(culture);
                if (years > 0) {
                    return formatter.DateHumanize(7 /* Year */, tense, years);
                }
                if (months > 0) {
                    return formatter.DateHumanize(6 /* Month */, tense, months);
                }
                if (days > 0) {
                    return formatter.DateHumanize(4 /* Day */, tense, days);
                }
                if (hours > 0) {
                    return formatter.DateHumanize(3 /* Hour */, tense, hours);
                }
                if (minutes > 0) {
                    return formatter.DateHumanize(2 /* Minute */, tense, minutes);
                }
                if (seconds > 0) {
                    return formatter.DateHumanize(1 /* Second */, tense, seconds);
                }
                return formatter.DateHumanize(0 /* Millisecond */, tense, 0);
            };
            return PrecisionDateHumanizeStrategy;
        })();
        DateHumanizeStrategy.PrecisionDateHumanizeStrategy = PrecisionDateHumanizeStrategy;
    })(Humanizer.DateHumanizeStrategy || (Humanizer.DateHumanizeStrategy = {}));
    var DateHumanizeStrategy = Humanizer.DateHumanizeStrategy;
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=PrecisionDateHumanizeStrategy.js.map
