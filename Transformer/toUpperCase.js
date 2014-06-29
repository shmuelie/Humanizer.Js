var Humanizer;
(function (Humanizer) {
    var ToUpperCase = (function () {
        function ToUpperCase() {
        }
        ToUpperCase.prototype.transform = function (input) {
            return input.toUpperCase();
        };
        return ToUpperCase;
    })();
    Humanizer.ToUpperCase = ToUpperCase;
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=toUpperCase.js.map
