var Humanizer;
(function (Humanizer) {
    "use strict";
    var charRegex = /[A-Za-z0-9]/;
    var FixedNumberOfCharactersTruncator = (function () {
        function FixedNumberOfCharactersTruncator() {
        }
        FixedNumberOfCharactersTruncator.prototype.truncate = function (value, length, truncationString, truncateFrom) {
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
            var alphaNumericalCharatersProcessed = 0;
            if (value.match(charRegex).length <= length) {
                return value;
            }
            var i;
            if (truncateFrom = Humanizer.TruncateFrom.Left) {
                for (i = value.length - 1; i > 0; i--) {
                    if (charRegex.test(value.charAt(i))) {
                        alphaNumericalCharatersProcessed++;
                    }
                    if (alphaNumericalCharatersProcessed + truncationString.length === length) {
                        return truncationString + value.substr(i);
                    }
                }
            }
            for (i = 0; i < value.length - truncationString.length; i++) {
                if (charRegex.test(value.charAt(i))) {
                    alphaNumericalCharatersProcessed++;
                }
                if (alphaNumericalCharatersProcessed + truncationString.length === length) {
                    return value.substr(0, i + 1) + truncationString;
                }
            }
            return value;
        };
        return FixedNumberOfCharactersTruncator;
    })();
    Humanizer.FixedNumberOfCharactersTruncator = FixedNumberOfCharactersTruncator;
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=FixedNumberOfCharactersTruncator.js.map