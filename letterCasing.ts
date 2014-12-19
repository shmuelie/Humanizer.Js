module Humanizer
{
    "use strict";

    /**
     * @enum
     * @readonly
     */
    export enum LetterCasing
    {
        /** SomeString -> Some String */
        Title,
        /** SomeString -> SOME STRING */
        AllCaps,
        /** SomeString -> some string */
        LowerCase,
        /** SomeString -> Some string */
        Sentence
    }
} 