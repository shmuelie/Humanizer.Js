var Humanizer;
(function (Humanizer) {
    /**
    * Truncation location for humanizer
    * @enum
    * @readonly
    */
    (function (TruncateFrom) {
        /** Truncate letters from the left (start) of the string */
        TruncateFrom[TruncateFrom["Left"] = 0] = "Left";

        /** Truncate letters from the right (end) of the string */
        TruncateFrom[TruncateFrom["Right"] = 1] = "Right";
    })(Humanizer.TruncateFrom || (Humanizer.TruncateFrom = {}));
    var TruncateFrom = Humanizer.TruncateFrom;
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=truncateExtensions.js.map
