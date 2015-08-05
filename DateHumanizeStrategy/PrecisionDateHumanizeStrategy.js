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
                var tense = input > comparisonBase ? 0 /* Future */ : 1 /* Past */;
                var ts = Math.abs(comparisonBase.getTime() - input.getTime());
                var days = ts.toDays();
                var weeks = Math.floor(days / 7);
                var daysInWeek = days % 7;
                ts = ts - (weeks * 7 + daysInWeek).milliseconds();
                var hours = Math.floor(ts.toHours());
                ts = ts - hours.toMilliseconds();
                var minutes = Math.floor(ts.toMinutes());
                ts = ts - minutes.milliseconds();
                var seconds = Math.floor(ts.toSeconds());
                var milliseconds = ts - seconds.milliseconds();
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
                var factor;
                var maxMonths;
                if (days > 31 && days < 365 * this.precision) {
                    factor = Math.floor(days / 30);
                    maxMonths = Math.ceil(days / 30);
                    months = (days >= 30 * (factor + this.precision)) ? maxMonths : maxMonths - 1;
                }
                if (days >= 365 * this.precision && days <= 366) {
                    years = 1;
                }
                if (days > 365) {
                    factor = Math.floor(days / 365);
                    maxMonths = Math.ceil(days / 365);
                    years = (days >= 365 * (factor + this.precision)) ? maxMonths : maxMonths - 1;
                }
                var formatter = Humanizer.Configuration.Configurator.getFormatter(culture);
                if (years > 0) {
                    return formatter.DateHumanize(Humanizer.Localisation.TimeUnit.Year, tense, years);
                }
                if (months > 0) {
                    return formatter.DateHumanize(Humanizer.Localisation.TimeUnit.Month, tense, months);
                }
                if (days > 0) {
                    return formatter.DateHumanize(Humanizer.Localisation.TimeUnit.Day, tense, days);
                }
                if (hours > 0) {
                    return formatter.DateHumanize(Humanizer.Localisation.TimeUnit.Hour, tense, hours);
                }
                if (minutes > 0) {
                    return formatter.DateHumanize(Humanizer.Localisation.TimeUnit.Minute, tense, minutes);
                }
                if (seconds > 0) {
                    return formatter.DateHumanize(Humanizer.Localisation.TimeUnit.Second, tense, seconds);
                }
                return formatter.DateHumanize(Humanizer.Localisation.TimeUnit.Millisecond, tense, 0);
            };
            return PrecisionDateHumanizeStrategy;
        })();
        DateHumanizeStrategy.PrecisionDateHumanizeStrategy = PrecisionDateHumanizeStrategy;
    })(DateHumanizeStrategy = Humanizer.DateHumanizeStrategy || (Humanizer.DateHumanizeStrategy = {}));
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=PrecisionDateHumanizeStrategy.js.map