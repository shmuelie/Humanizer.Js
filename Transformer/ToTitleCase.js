var Humanizer;
(function (Humanizer) {
    "use strict";
    var ToTitleCase = (function () {
        function ToTitleCase() {
        }
        ToTitleCase.prototype.transform = function (input) {
            var words = input.split(" ");
            var result = [];
            var length = words.length;
            for (var i = 0; i < length; i++) {
                var word = words[i];
                if ((word.length === 0) || (word === word.toUpperCase())) {
                    result.push(word);
                }
                else if (word.length === 1) {
                    result.push(word.toUpperCase());
                }
                else {
                    result.push(word.charAt(0).toUpperCase() + word.substr(1).toLowerCase());
                }
            }
            return result.join(" ");
        };
        return ToTitleCase;
    })();
    Humanizer.ToTitleCase = ToTitleCase;
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=ToTitleCase.js.map