var Humanizer;
(function (Humanizer) {
    (function (Localisation) {
        (function (ResourceKeys) {
            "use strict";

            var TimeHumanize = (function () {
                function TimeHumanize() {
                }
                TimeHumanize.TimeFormat = "TimeHumanize_{0}{1}{2}";
                TimeHumanize.Zero = "TimeHumanize_Zero";
                TimeHumanize.GetResourceKey = function (unit, count) {
                    if (typeof count === "undefined") { count = 1; }
                    ResourceKeys.ValidateRange(count);

                    if (count === 0) {
                        return TimeHumanize.Zero;
                    }

                    return Humanizer.Resources.format(TimeHumanize.TimeFormat, count === 1 ? ResourceKeys.Single : ResourceKeys.Multiple, Localisation.TimeUnit[unit], count === 1 ? "" : "s");
                };
                return TimeHumanize;
            })();
            ResourceKeys.TimeHumanize = TimeHumanize;
        })(Localisation.ResourceKeys || (Localisation.ResourceKeys = {}));
        var ResourceKeys = Localisation.ResourceKeys;
    })(Humanizer.Localisation || (Humanizer.Localisation = {}));
    var Localisation = Humanizer.Localisation;
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=ResourceKeys.TimeHumanize.js.map
