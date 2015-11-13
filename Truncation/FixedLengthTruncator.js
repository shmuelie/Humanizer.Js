var Humanizer;
(function (Humanizer) {
    "use strict";
    var FixedLengthTruncator = (function () {
        function FixedLengthTruncator() {
        }
        FixedLengthTruncator.prototype.truncate = function (value, length, truncationString, truncateFrom) {
            if (truncateFrom === void 0) { truncateFrom = Humanizer.TruncateFrom.Right; }
            if (!value) {
                return null;
            }
            if (value.length === 0) {
                return value;
            }
            if (truncationString === null || truncationString.length > length) {
                return truncateFrom === Humanizer.TruncateFrom.Right ? value.substr(0, length) : value.substr(value.length - length);
            }
            if (truncateFrom === Humanizer.TruncateFrom.Left) {
                return value.length > length ? truncationString + value.substr(value.length - length + truncationString.length) : value;
            }
            return value.length > length ? value.substr(0, length - truncationString.length) + truncationString : value;
        };
        return FixedLengthTruncator;
    })();
    Humanizer.FixedLengthTruncator = FixedLengthTruncator;
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=FixedLengthTruncator.js.map