var Humanizer;
(function (Humanizer) {
    var Localisation;
    (function (Localisation) {
        var ResourceKeys;
        (function (ResourceKeys) {
            "use strict";
            ResourceKeys.Single = "Single";
            ResourceKeys.Multiple = "Multiple";
            ResourceKeys.ValidateRange = function (count) {
                if (count < 0) {
                    throw new RangeError();
                }
            };
        })(ResourceKeys = Localisation.ResourceKeys || (Localisation.ResourceKeys = {}));
    })(Localisation = Humanizer.Localisation || (Humanizer.Localisation = {}));
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=ResourceKeys.js.map