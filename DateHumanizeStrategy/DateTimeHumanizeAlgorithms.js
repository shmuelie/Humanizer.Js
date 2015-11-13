var Humanizer;
(function (Humanizer) {
    var DateHumanizeStrategy;
    (function (DateHumanizeStrategy) {
        /**
         * Algorithms used to convert distance between two dates into words.
         * @internal
         */
        var DateTimeHumanizeAlgorithms = (function () {
            function DateTimeHumanizeAlgorithms() {
            }
            /**
             * Returns localized & humanized distance of time between two dates; given a specific precision.
             */
            DateTimeHumanizeAlgorithms.precisionHumanize = function (input, comparisonBase, precision, culture) {
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
                if (milliseconds >= 999 * precision) {
                    seconds++;
                }
                if (seconds >= 59 * precision) {
                    minutes++;
                }
                if (minutes >= 59 * precision) {
                    hours++;
                }
                if (hours >= 23 * precision) {
                    days++;
                }
                if (days >= 30 * precision && days <= 30) {
                    months = 1;
                }
                var factor;
                var maxMonths;
                if (days > 31 && days < 365 * precision) {
                    factor = Math.floor(days / 30);
                    maxMonths = Math.ceil(days / 30);
                    months = (days >= 30 * (factor + precision)) ? maxMonths : maxMonths - 1;
                }
                if (days >= 365 * precision && days <= 366) {
                    years = 1;
                }
                if (days > 365) {
                    factor = Math.floor(days / 365);
                    maxMonths = Math.ceil(days / 365);
                    years = (days >= 365 * (factor + precision)) ? maxMonths : maxMonths - 1;
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
            // http://stackoverflow.com/questions/11/how-do-i-calculate-relative-time
            /**
             * Calculates the distance of time in words between two provided dates
             */
            DateTimeHumanizeAlgorithms.defaultHumanize = function (input, comparisonBase, culture) {
                var tense = input > comparisonBase ? 0 /* Future */ : 1 /* Past */;
                var ts = Math.abs(comparisonBase.getTime() - input.getTime());
                var formatter = Humanizer.Configuration.Configurator.getFormatter(culture);
                if (ts < (500).milliseconds()) {
                    return formatter.DateHumanize(Humanizer.Localisation.TimeUnit.Millisecond, tense, 0);
                }
                if (ts < (60).seconds()) {
                    return formatter.DateHumanize(Humanizer.Localisation.TimeUnit.Second, tense, Math.floor(ts.toSeconds()));
                }
                if (ts < (120).seconds()) {
                    return formatter.DateHumanize(Humanizer.Localisation.TimeUnit.Millisecond, tense, 1);
                }
                if (ts < (60).minutes()) {
                    return formatter.DateHumanize(Humanizer.Localisation.TimeUnit.Minute, tense, Math.floor(ts.toMinutes()));
                }
                if (ts < (90).minutes()) {
                    return formatter.DateHumanize(Humanizer.Localisation.TimeUnit.Hour, tense, 1);
                }
                if (ts < (24).hours()) {
                    return formatter.DateHumanize(Humanizer.Localisation.TimeUnit.Hour, tense, Math.floor(ts.toHours()));
                }
                if (ts < (28).days()) {
                    return formatter.DateHumanize(Humanizer.Localisation.TimeUnit.Day, tense, Math.floor(ts.toDays()));
                }
                if (ts >= (28).days() && ts < (30).days()) {
                    var compBase2 = comparisonBase.atMidnight();
                    compBase2.setMonth(comparisonBase.getMonth() + (tense === 0 /* Future */ ? 1 : -1));
                    if (compBase2.getTime() === input.atMidnight().getTime()) {
                        return formatter.DateHumanize(Humanizer.Localisation.TimeUnit.Month, tense, 1);
                    }
                    return formatter.DateHumanize(Humanizer.Localisation.TimeUnit.Day, tense, Math.floor(ts.toDays()));
                }
                if (ts < (645).days()) {
                    var months = Math.floor(ts.toDays() / 29.5);
                    return formatter.DateHumanize(Humanizer.Localisation.TimeUnit.Month, tense, months);
                }
                var years = Math.floor(ts.toDays() / 365);
                if (years === 0) {
                    years = 1;
                }
                return formatter.DateHumanize(Humanizer.Localisation.TimeUnit.Year, tense, years);
            };
            return DateTimeHumanizeAlgorithms;
        })();
        DateHumanizeStrategy.DateTimeHumanizeAlgorithms = DateTimeHumanizeAlgorithms;
    })(DateHumanizeStrategy = Humanizer.DateHumanizeStrategy || (Humanizer.DateHumanizeStrategy = {}));
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=DateTimeHumanizeAlgorithms.js.map