var Humanizer;
(function (Humanizer) {
    "use strict";
    /**
     * 3501.ToWords() -> "three thousand five hundred and one"
     */
    Number.prototype.toWords = function () {
        /// <summary>
        ///     3501.ToWords() -> "three thousand five hundred and one"
        /// </summary>
        var gender = arguments.length >= 1 && typeof arguments[0] === "number" ? arguments[0] : null;
        var converter = Humanizer.Configuration.Configurator.getNumberToWordsConverter(arguments.length > 0 && typeof arguments[arguments.length - 1] === "string" ? arguments[arguments.length - 1] : Humanizer.Resources.getCurrentCulture());
        if (gender === null) {
            return converter.convert(this);
        }
        return converter.convert(this, gender);
    };
    Number.prototype.toOrdinalWords = function () {
        var gender = arguments.length >= 1 && typeof arguments[0] === "number" ? arguments[0] : null;
        var converter = Humanizer.Configuration.Configurator.getNumberToWordsConverter(arguments.length > 0 && typeof arguments[arguments.length - 1] === "string" ? arguments[arguments.length - 1] : Humanizer.Resources.getCurrentCulture());
        if (gender === null) {
            return converter.convertToOrdinal(this);
        }
        return converter.convertToOrdinal(this, gender);
    };
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=numberToWordsExtension.js.map