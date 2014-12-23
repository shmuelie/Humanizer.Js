var Humanizer;
(function (Humanizer) {
    "use strict";

    /**
    * Options for specifying the desired grammatical gender for the output words
    * @enum
    */
    (function (GrammaticalGender) {
        /**
        * Indicates masculine grammatical gender
        */
        GrammaticalGender[GrammaticalGender["Masculine"] = 0] = "Masculine";

        /**
        * Indicates feminine grammatical gender
        */
        GrammaticalGender[GrammaticalGender["Feminine"] = 1] = "Feminine";

        /**
        * Indicates neuter grammatical gender
        */
        GrammaticalGender[GrammaticalGender["Neuter"] = 2] = "Neuter";
    })(Humanizer.GrammaticalGender || (Humanizer.GrammaticalGender = {}));
    var GrammaticalGender = Humanizer.GrammaticalGender;
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=grammaticalGender.js.map
