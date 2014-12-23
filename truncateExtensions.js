var Humanizer;
(function (Humanizer) {
    "use strict";

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

    String.prototype.truncate = function (length, truncator, from) {
        if (typeof truncator === "undefined") { truncator = Humanizer.Truncator.FixedLength; }
        if (typeof from === "undefined") { from = 1 /* Right */; }
        return truncator.truncate(this, length, "…", from);
    };

    String.prototype.truncateWith = function (length, truncationString, truncator, from) {
        if (typeof truncator === "undefined") { truncator = Humanizer.Truncator.FixedLength; }
        if (typeof from === "undefined") { from = 1 /* Right */; }
        return truncator.truncate(this, length, truncationString, from);
    };
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=truncateExtensions.js.map
