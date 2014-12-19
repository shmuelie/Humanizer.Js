var Humanizer;
(function (Humanizer) {
    "use strict";
    /**
     * Dictating what should be done when a match is not found - currently used only for DehumanizeTo
     * @readononly
     * @enum
     */
    (function (OnNoMatch) {
        //** This is the default behavior which throws a NoMatchFoundException */
        OnNoMatch[OnNoMatch["ThrowsException"] = 0] = "ThrowsException";
        /** If set to ReturnsNull the method returns null instead of throwing an exception */
        OnNoMatch[OnNoMatch["ReturnsNull"] = 1] = "ReturnsNull";
    })(Humanizer.OnNoMatch || (Humanizer.OnNoMatch = {}));
    var OnNoMatch = Humanizer.OnNoMatch;
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=onNoMatch.js.map