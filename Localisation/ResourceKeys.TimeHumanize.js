var Humanizer;
(function (Humanizer) {
    var Localisation;
    (function (Localisation) {
        var ResourceKeys;
        (function (ResourceKeys) {
            "use strict";
            var TimeHumanize = (function () {
                function TimeHumanize() {
                }
                TimeHumanize.TimeFormat = "TimeHumanize_{0}{1}{2}";
                TimeHumanize.Zero = "TimeHumanize_Zero";
                TimeHumanize.GetResourceKey = function (unit, count) {
                    if (count === void 0) { count = 1; }
                    ResourceKeys.ValidateRange(count);
                    if (count === 0) {
                        return TimeHumanize.Zero;
                    }
                    return Humanizer.Resources.format(TimeHumanize.TimeFormat, count === 1 ? ResourceKeys.Single : ResourceKeys.Multiple, Localisation.TimeUnit[unit], count === 1 ? "" : "s");
                };
                return TimeHumanize;
            })();
            ResourceKeys.TimeHumanize = TimeHumanize;
        })(ResourceKeys = Localisation.ResourceKeys || (Localisation.ResourceKeys = {}));
    })(Localisation = Humanizer.Localisation || (Humanizer.Localisation = {}));
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=ResourceKeys.TimeHumanize.js.map