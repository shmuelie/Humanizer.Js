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
        if (arguments.length === 1) {
            return Humanizer.Configuration.Configurator.getNumberToWordsConverter().convert(this, arguments[0]);
        }

        return Humanizer.Configuration.Configurator.getNumberToWordsConverter().convert(this);
    };

    Number.prototype.toOrdinalWords = function () {
        if (arguments.length === 1) {
            return Humanizer.Configuration.Configurator.getNumberToWordsConverter().convertToOrdinal(this, arguments[0]);
        }
        return Humanizer.Configuration.Configurator.getNumberToWordsConverter().convertToOrdinal(this);
    };
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=numberToWordsExtension.js.map
