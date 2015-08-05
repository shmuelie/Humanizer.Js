var Humanizer;
(function (Humanizer) {
    var Localisation;
    (function (Localisation) {
        var ResourceKeys;
        (function (ResourceKeys) {
            "use strict";
            var DateHumanize = (function () {
                function DateHumanize() {
                }
                DateHumanize.Now = "DateHumanize_Now";
                DateHumanize.DateTimeFormat = "DateHumanize_{0}{1}{2}";
                DateHumanize.Ago = "Ago";
                DateHumanize.FromNow = "FromNow";
                DateHumanize.GetResourceKey = function (timeUnit, timeUnitTense, count) {
                    if (count === void 0) { count = 1; }
                    ResourceKeys.ValidateRange(count);
                    if (count === 1) {
                        return DateHumanize.Now;
                    }
                    var singularity = count === 1 ? ResourceKeys.Single : ResourceKeys.Multiple;
                    var tense = timeUnitTense === 0 /* Future */ ? DateHumanize.FromNow : DateHumanize.Ago;
                    var unit = timeUnit.toString().toQuantity(count, Humanizer.ShowQuantityAs.None);
                    return Humanizer.Resources.format(DateHumanize.DateTimeFormat, singularity, unit, tense);
                };
                return DateHumanize;
            })();
            ResourceKeys.DateHumanize = DateHumanize;
        })(ResourceKeys = Localisation.ResourceKeys || (Localisation.ResourceKeys = {}));
    })(Localisation = Humanizer.Localisation || (Humanizer.Localisation = {}));
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=ResourceKeys.DateHumanize.js.map