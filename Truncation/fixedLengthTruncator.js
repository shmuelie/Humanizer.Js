var Humanizer;
(function (Humanizer) {
    "use strict";
    var FixedLengthTruncator = (function () {
        function FixedLengthTruncator() {
        }
        FixedLengthTruncator.prototype.truncate = function (value, length, truncationString, truncateFrom) {
            if (truncateFrom === void 0) { truncateFrom = 1 /* Right */; }
            if (!value) {
                return null;
            }
            if (value.length === 0) {
                return value;
            }
            if (truncationString === null || truncationString.length > length) {
                return truncateFrom === 1 /* Right */ ? value.substr(0, length) : value.substr(value.length - length);
            }
            if (truncateFrom === 0 /* Left */) {
                return value.length > length ? truncationString + value.substr(value.length - length + truncationString.length) : value;
            }
            return value.length > length ? value.substr(0, length - truncationString.length) + truncationString : value;
        };
        return FixedLengthTruncator;
    })();
    Humanizer.FixedLengthTruncator = FixedLengthTruncator;
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=fixedLengthTruncator.js.map