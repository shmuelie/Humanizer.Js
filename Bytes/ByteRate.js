var Humanizer;
(function (Humanizer) {
    var Bytes;
    (function (Bytes) {
        "use strict";
        var ByteRate = (function () {
            function ByteRate(size, interval) {
                this.size = size;
                this.interval = interval;
            }
            ByteRate.prototype.humanize = function (timeUnit) {
                if (timeUnit === void 0) { timeUnit = Humanizer.Localisation.TimeUnit.Second; }
                var displayInterval;
                var displayUnit;
                if (timeUnit === Humanizer.Localisation.TimeUnit.Second) {
                    displayInterval = (1).seconds();
                    displayUnit = "s";
                }
                else if (timeUnit === Humanizer.Localisation.TimeUnit.Minute) {
                    displayInterval = (1).minutes();
                    displayUnit = "min";
                }
                else if (timeUnit === Humanizer.Localisation.TimeUnit.Hour) {
                    displayInterval = (1).hours();
                    displayUnit = "hour";
                }
                else {
                    throw Error("timeUnit must be Second, Minute, or Hour");
                }
                return (new Bytes.ByteSize(this.size.bytes / this.interval.toSeconds() * displayInterval.toSeconds())).toString() + "/" + displayUnit;
            };
            return ByteRate;
        })();
        Bytes.ByteRate = ByteRate;
    })(Bytes = Humanizer.Bytes || (Humanizer.Bytes = {}));
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=ByteRate.js.map