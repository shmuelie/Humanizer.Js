var Humanizer;
(function (Humanizer) {
    /**
    * Dehumanizes a string; e.g. 'some string', 'Some String', 'Some string' -> 'SomeString'
    */
    String.prototype.dehumanize = function () {
        /// <summary>
        ///     Dehumanizes a string; e.g. 'some string', 'Some String', 'Some string' -> 'SomeString'
        /// </summary>
        var titlizedWords = this.split(" ");
        var length = titlizedWords.length;
        for (var i = 0; i < length; i++) {
            titlizedWords[i] = titlizedWords[i].humanize(0 /* Title */);
        }
        return titlizedWords.join("").replace(" ", "");
    };
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=stringDehumanizeExtensions.js.map
