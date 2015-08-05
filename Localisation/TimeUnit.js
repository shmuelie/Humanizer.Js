var Humanizer;
(function (Humanizer) {
    var Localisation;
    (function (Localisation) {
        "use strict";
        /**
         * Units of time.
         * @enum
         * @readonly
         */
        (function (TimeUnit) {
            TimeUnit[TimeUnit["Millisecond"] = 0] = "Millisecond";
            TimeUnit[TimeUnit["Second"] = 1] = "Second";
            TimeUnit[TimeUnit["Minute"] = 2] = "Minute";
            TimeUnit[TimeUnit["Hour"] = 3] = "Hour";
            TimeUnit[TimeUnit["Day"] = 4] = "Day";
            TimeUnit[TimeUnit["Week"] = 5] = "Week";
            TimeUnit[TimeUnit["Month"] = 6] = "Month";
            TimeUnit[TimeUnit["Year"] = 7] = "Year";
        })(Localisation.TimeUnit || (Localisation.TimeUnit = {}));
        var TimeUnit = Localisation.TimeUnit;
    })(Localisation = Humanizer.Localisation || (Humanizer.Localisation = {}));
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=TimeUnit.js.map