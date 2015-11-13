var Humanizer;
(function (Humanizer) {
    "use strict";
    var ToLowerCase = (function () {
        function ToLowerCase() {
        }
        ToLowerCase.prototype.transform = function (input) {
            return input.toLocaleLowerCase();
        };
        return ToLowerCase;
    })();
    Humanizer.ToLowerCase = ToLowerCase;
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=ToLowerCase.js.map