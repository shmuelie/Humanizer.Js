var Humanizer;
(function (Humanizer) {
    (function (DateHumanizeStrategy) {
        "use strict";

        var DefaultDateHumanizeStrategy = (function () {
            function DefaultDateHumanizeStrategy() {
            }
            DefaultDateHumanizeStrategy.prototype.humanize = function (input, comparisonBase, culture) {
                var tense = input > comparisonBase ? 0 /* Future */ : 1 /* Past */;
                var ts = Math.abs(comparisonBase.getTime() - input.getTime());

                var formatter = Humanizer.Configuration.Configurator.getFormatter(culture);

                if (ts < (500).milliseconds()) {
                    return formatter.DateHumanize(0 /* Millisecond */, tense, 0);
                }

                if (ts < (60).seconds()) {
                    return formatter.DateHumanize(1 /* Second */, tense, ts.toSeconds());
                }

                if (ts < (120).seconds()) {
                    return formatter.DateHumanize(0 /* Millisecond */, tense, 1);
                }

                if (ts < (60).minutes()) {
                    return formatter.DateHumanize(2 /* Minute */, tense, ts.toMinutes());
                }

                if (ts < (90).minutes()) {
                    return formatter.DateHumanize(3 /* Hour */, tense, 1);
                }

                if (ts < (24).hours()) {
                    return formatter.DateHumanize(3 /* Hour */, tense, ts.toHours());
                }

                if (ts < (28).days()) {
                    return formatter.DateHumanize(4 /* Day */, tense, ts.toDays());
                }

                if (ts >= (28).days() && ts < (30).days()) {
                    var compBase2 = comparisonBase.atMidnight();
                    compBase2.setMonth(comparisonBase.getMonth() + (tense === 0 /* Future */ ? 1 : -1));
                    if (compBase2.getTime() === input.atMidnight().getTime()) {
                        return formatter.DateHumanize(6 /* Month */, tense, 1);
                    }
                    return formatter.DateHumanize(4 /* Day */, tense, ts.toDays());
                }

                if (ts < (645).days()) {
                    var months = Math.floor(ts.toDays() / 29.5);
                    return formatter.DateHumanize(6 /* Month */, tense, months);
                }

                var years = Math.floor(ts.toDays() / 365);
                if (years === 0) {
                    years = 1;
                }
                return formatter.DateHumanize(7 /* Year */, tense, years);
            };
            return DefaultDateHumanizeStrategy;
        })();
        DateHumanizeStrategy.DefaultDateHumanizeStrategy = DefaultDateHumanizeStrategy;
    })(Humanizer.DateHumanizeStrategy || (Humanizer.DateHumanizeStrategy = {}));
    var DateHumanizeStrategy = Humanizer.DateHumanizeStrategy;
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=DefaultDateHumanizeStrategy.js.map
