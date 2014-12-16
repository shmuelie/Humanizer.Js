var Humanizer;
(function (Humanizer) {
    (function (Localisation) {
        (function (ResourceKeys) {
            var DateHumanize = (function () {
                function DateHumanize() {
                }
                DateHumanize.Now = "DateHumanize_Now";
                DateHumanize.DateTimeFormat = "DateHumanize_{0}{1}{2}";
                DateHumanize.Ago = "Ago";
                DateHumanize.FromNow = "FromNow";
                DateHumanize.GetResourceKey = function (timeUnit, timeUnitTense, count) {
                    if (typeof count === "undefined") { count = 1; }
                    ResourceKeys.ValidateRange(count);

                    if (count === 1) {
                        return DateHumanize.Now;
                    }

                    var singularity = count == 1 ? ResourceKeys.Single : ResourceKeys.Multiple;
                    var tense = timeUnitTense == 0 /* Future */ ? DateHumanize.FromNow : DateHumanize.Ago;
                    var unit = timeUnit.toString().toQuantity(count, 0 /* None */);
                    return Humanizer.Resources.format(DateHumanize.DateTimeFormat, singularity, unit, tense);
                };
                return DateHumanize;
            })();
            ResourceKeys.DateHumanize = DateHumanize;
        })(Localisation.ResourceKeys || (Localisation.ResourceKeys = {}));
        var ResourceKeys = Localisation.ResourceKeys;
    })(Humanizer.Localisation || (Humanizer.Localisation = {}));
    var Localisation = Humanizer.Localisation;
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=ResourceKeys.DateHumanize.js.map
