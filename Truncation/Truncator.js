var Humanizer;
(function (Humanizer) {
    "use strict";
    var Truncator = (function () {
        function Truncator() {
        }
        Truncator.FixedLength = new Humanizer.FixedLengthTruncator();
        Truncator.FixedNumberOfCharacters = new Humanizer.FixedNumberOfCharactersTruncator();
        Truncator.FixedNumberOfWords = new Humanizer.FixedNumberOfWordsTruncator();
        return Truncator;
    })();
    Humanizer.Truncator = Truncator;
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=Truncator.js.map