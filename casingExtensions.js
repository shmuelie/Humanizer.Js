var Humanizer;
(function (Humanizer) {
    /**
    * Changes the casing of the provided input
    */
    String.prototype.applyCasing = function (casing) {
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
