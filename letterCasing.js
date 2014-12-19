var Humanizer;
(function (Humanizer) {
    "use strict";
    /**
     * @enum
     * @readonly
     */
    (function (LetterCasing) {
        /** SomeString -> Some String */
        LetterCasing[LetterCasing["Title"] = 0] = "Title";
        /** SomeString -> SOME STRING */
        LetterCasing[LetterCasing["AllCaps"] = 1] = "AllCaps";
        /** SomeString -> some string */
        LetterCasing[LetterCasing["LowerCase"] = 2] = "LowerCase";
        /** SomeString -> Some string */
        LetterCasing[LetterCasing["Sentence"] = 3] = "Sentence";
    })(Humanizer.LetterCasing || (Humanizer.LetterCasing = {}));
    var LetterCasing = Humanizer.LetterCasing;
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=letterCasing.js.map