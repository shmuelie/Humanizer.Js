var Humanizer;
(function (Humanizer) {
    "use strict";
    /**
     * Changes the casing of the provided input
     */
    String.prototype.applyCasing = function (casing) {
        /// <summary>
        ///     Changes the casing of the provided input
        /// </summary>
        switch (casing) {
            case 0 /* Title */:
                return this.transform(Humanizer.To.TitleCase);
            case 2 /* LowerCase */:
                return this.transform(Humanizer.To.LowerCase);
            case 1 /* AllCaps */:
                return this.transform(Humanizer.To.UpperCase);
            case 3 /* Sentence */:
                return this.transform(Humanizer.To.SentenceCase);
            default:
                throw new Error();
        }
    };
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=casingExtensions.js.map