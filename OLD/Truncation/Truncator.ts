module Humanizer
{
    "use strict";

    export class Truncator
    {
        static FixedLength: ITruncator = new FixedLengthTruncator();
        static FixedNumberOfCharacters: ITruncator = new FixedNumberOfCharactersTruncator();
        static FixedNumberOfWords: ITruncator = new FixedNumberOfWordsTruncator();
    }
} 