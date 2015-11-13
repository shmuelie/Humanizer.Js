var Humanizer;
(function (Humanizer) {
    "use strict";
    var ToSentenceCase = (function () {
        function ToSentenceCase() {
        }
        ToSentenceCase.prototype.transform = function (input) {
            if (input.length > 1) {
                return input.charAt(0).toUpperCase() + input.substr(1);
            }
            return input.toUpperCase();
        };
        return ToSentenceCase;
    })();
    Humanizer.ToSentenceCase = ToSentenceCase;
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=ToSentenceCase.js.map