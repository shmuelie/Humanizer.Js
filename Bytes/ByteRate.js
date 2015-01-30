var Humanizer;
(function (Humanizer) {
    (function (Bytes) {
        "use strict";

        var ByteRate = (function () {
            function ByteRate(size, interval) {
                this.size = size;
                this.interval = interval;
            }
            ByteRate.prototype.humanize = function (timeUnit) {
                if (typeof timeUnit === "undefined") { timeUnit = 1 /* Second */; }
                var displayInterval;
                var displayUnit;

                if (timeUnit === 1 /* Second */) {
                    displayInterval = (1).seconds();
                    displayUnit = "s";
                } else if (timeUnit === 2 /* Minute */) {
                    displayInterval = (1).minutes();
                    displayUnit = "min";
                } else if (timeUnit === 3 /* Hour */) {
                    displayInterval = (1).hours();
                    displayUnit = "hour";
                } else {
                    throw Error("timeUnit must be Second, Minute, or Hour");
                }

                return (new Bytes.ByteSize(this.size.bytes / this.interval.toSeconds() * displayInterval.toSeconds())).toString() + "/" + displayUnit;
            };
            return ByteRate;
        })();
        Bytes.ByteRate = ByteRate;
    })(Humanizer.Bytes || (Humanizer.Bytes = {}));
    var Bytes = Humanizer.Bytes;
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=ByteRate.js.map
