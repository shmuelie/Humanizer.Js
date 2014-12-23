interface String
{
    applyCasing(casing: Humanizer.LetterCasing): string;
}

module Humanizer
{
    "use strict";

    /** 
     * Changes the casing of the provided input 
     */
    String.prototype.applyCasing = function (casing: Humanizer.LetterCasing): string
    {
        /// <summary>
        ///     Changes the casing of the provided input
        /// </summary>

        switch (casing)
        {
            case Humanizer.LetterCasing.Title:
                return this.transform(Humanizer.To.TitleCase);
            case Humanizer.LetterCasing.LowerCase:
                return this.transform(Humanizer.To.LowerCase);
            case Humanizer.LetterCasing.AllCaps:
                return this.transform(Humanizer.To.UpperCase);
            case Humanizer.LetterCasing.Sentence:
                return this.transform(Humanizer.To.SentenceCase);
            default:
                throw new Error();
        }
    };
} 