var Humanizer;
(function (Humanizer) {
    (function (Localisation) {
        (function (ResourceKeys) {
            ResourceKeys.Single = "Single";
            ResourceKeys.Multiple = "Multiple";
            ResourceKeys.ValidateRange = function (count) {
                if (count < 0) {
                    throw new RangeError();
                }
            };
        })(Localisation.ResourceKeys || (Localisation.ResourceKeys = {}));
        var ResourceKeys = Localisation.ResourceKeys;
    })(Humanizer.Localisation || (Humanizer.Localisation = {}));
    var Localisation = Humanizer.Localisation;
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=ResourceKeys.js.map
