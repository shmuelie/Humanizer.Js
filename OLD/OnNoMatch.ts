module Humanizer
{
    "use strict";

    /**
     * Dictating what should be done when a match is not found - currently used only for DehumanizeTo
     * @readononly
     * @enum
     */
    export const enum OnNoMatch
    {
        //** This is the default behavior which throws a NoMatchFoundException */
        ThrowsException,
        /** If set to ReturnsNull the method returns null instead of throwing an exception */
        ReturnsNull
    }
}