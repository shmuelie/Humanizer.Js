interface String
{
    dehumanize(): string;
}

module Humanizer
{
    "use strict";

    /**
     * Dehumanizes a string; e.g. 'some string', 'Some String', 'Some string' -> 'SomeString'
     */
    String.prototype.dehumanize = function (): string
    {
        /// <summary>
        ///     Dehumanizes a string; e.g. 'some string', 'Some String', 'Some string' -> 'SomeString'
        /// </summary>

        var titlizedWords: string[] = this.split(" ");
        var length: number = titlizedWords.length;
        for (var i: number = 0; i < length; i++)
        {
            titlizedWords[i] = titlizedWords[i].humanize(Humanizer.LetterCasing.Title);
        }
        return titlizedWords.join("").replace(" ", "");
    };
} 