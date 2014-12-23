var Humanizer;
(function (Humanizer) {
    "use strict";

    /** Transforms a string using the provided transformers. Transformations are applied in the provided order. */
    String.prototype.transform = function () {
        /// <summary>
        ///     Transforms a string using the provided transformers. Transformations are applied in the provided order.
        /// </summary>
        var transformers = [];
        for (var _i = 0; _i < (arguments.length - 0); _i++) {
            transformers[_i] = arguments[_i + 0];
        }
        var str = this;
        var length = transformers.length;
        for (var i = 0; i < length; i++) {
            str = transformers[i].transform(str);
        }
        return str;
    };

    var To = (function () {
        function To() {
        }
        To.TitleCase = new Humanizer.ToTitleCase();
        To.UpperCase = new Humanizer.ToUpperCase();
        To.LowerCase = new Humanizer.ToLowerCase();
        To.SentenceCase = new Humanizer.ToSentenceCase();
        return To;
    })();
    Humanizer.To = To;
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=to.js.map
