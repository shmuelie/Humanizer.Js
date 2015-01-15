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

    var Trunc = (function () {
        function Trunc() {
        }
        Trunc.prototype.truncate = function () {
            var length = arguments[0];
            var truncationString = "…";
            var from = 1 /* Right */;
            var truncator = Humanizer.Truncator.FixedLength;
            if (arguments.length > 1) {
                if (typeof arguments[1] === "string") {
                    truncationString = arguments[1];
                } else {
                    truncator = arguments[1];
                }
            }
            if (arguments.length > 2) {
                if (typeof arguments[2] === "number") {
                    from = arguments[2];
                } else {
                    truncator = arguments[2];
                }
            }
            if (arguments.length > 3) {
                from = arguments[3];
            }

            var $this = this;

            return truncator.truncate($this, length, truncationString, from);
        };
        return Trunc;
    })();

    String.prototype.truncate = Trunc.prototype.truncate;
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=truncateExtensions.js.map
