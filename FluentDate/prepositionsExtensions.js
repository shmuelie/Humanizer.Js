var Humanizer;
(function (Humanizer) {
    "use strict";
    Date.prototype.at = function (hour, min, second, millisecond) {
        if (min === void 0) { min = 0; }
        if (second === void 0) { second = 0; }
        if (millisecond === void 0) { millisecond = 0; }
        return new Date(this.getFullYear(), this.getMonth(), this.getDate(), hour, min, second, millisecond);
    };
    /**
     * Returns a new instance of DateTime based on the provided date where the time is set to midnight
     */
    Date.prototype.atMidnight = function () {
        /// <summary>
        ///     Returns a new instance of DateTime based on the provided date where the time is set to midnight
        /// </summary>
        return this.at(0);
    };
    /**
     * Returns a new instance of DateTime based on the provided date where the time is set to noon
     */
    Date.prototype.atNoon = function () {
        /// <summary>
        ///     Returns a new instance of DateTime based on the provided date where the time is set to noon
        /// </summary>
        return this.at(12);
    };
    /**
     * Returns a new instance of DateTime based on the provided date where the year is set to the provided year
     */
    Date.prototype.in = function (year) {
        /// <summary>
        ///     Returns a new instance of DateTime based on the provided date where the year is set to the provided year
        /// </summary>
        return new Date(year, this.getMonth(), this.getDate(), this.getHours(), this.getSeconds(), this.getMilliseconds());
    };
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=prepositionsExtensions.js.map