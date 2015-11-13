var Humanizer;
(function (Humanizer) {
    "use strict";
    var whiteSpaceTest = /\s/;
    var empty = /^\s*$/;
    function truncateFromRight(value, length, truncationString) {
        var lastCharactersWasWhiteSpace = true;
        var numberOfWordsProcessed = 0;
        for (var i = 0; i < value.length; i++) {
            if (whiteSpaceTest.test(value.charAt(i))) {
                if (!lastCharactersWasWhiteSpace) {
                    numberOfWordsProcessed++;
                }
                lastCharactersWasWhiteSpace = true;
                if (numberOfWordsProcessed === length) {
                    return value.substr(0, i) + truncationString;
                }
            }
            else {
                lastCharactersWasWhiteSpace = false;
            }
        }
        return value + truncationString;
    }
    function truncateFromLeft(value, length, truncationString) {
        var lastCharactersWasWhiteSpace = true;
        var numberOfWordsProcessed = 0;
        for (var i = value.length - 1; i > 0; i--) {
            if (whiteSpaceTest.test(value.charAt(i))) {
                if (!lastCharactersWasWhiteSpace) {
                    numberOfWordsProcessed++;
                }
                lastCharactersWasWhiteSpace = true;
                if (numberOfWordsProcessed === length) {
                    return truncationString + value.substr(i + 1).trim();
                }
            }
            else {
                lastCharactersWasWhiteSpace = false;
            }
        }
        return truncationString + value;
    }
    var FixedNumberOfWordsTruncator = (function () {
        function FixedNumberOfWordsTruncator() {
        }
        FixedNumberOfWordsTruncator.prototype.truncate = function (value, length, truncationString, truncateFrom) {
            if (truncateFrom === void 0) { truncateFrom = Humanizer.TruncateFrom.Right; }
            if (value === null) {
                return null;
            }
            if (value.length === 0) {
                return value;
            }
            var numberOfWords = 0;
            var words = value.split(whiteSpaceTest);
            for (var i = 0; i < words.length; i++) {
                if (!empty.test(words[i])) {
                    numberOfWords++;
                }
            }
            if (numberOfWords <= length) {
                return value;
            }
            return truncateFrom === Humanizer.TruncateFrom.Right ? truncateFromRight(value, length, truncationString) : truncateFromLeft(value, length, truncationString);
        };
        return FixedNumberOfWordsTruncator;
    })();
    Humanizer.FixedNumberOfWordsTruncator = FixedNumberOfWordsTruncator;
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=FixedNumebrOfWordsTruncator.js.map