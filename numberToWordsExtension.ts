interface Number
{
    toWords(): string;
    toWords(gender: Humanizer.GrammaticalGender): string;
    toOrdinalWords(): string;
    toOrdinalWords(gender: Humanizer.GrammaticalGender): string;
}

module Humanizer
{
    "use strict";

    /**
     * 3501.ToWords() -> "three thousand five hundred and one"
     */
    Number.prototype.toWords = function (): string
    {
        /// <summary>
        ///     3501.ToWords() -> "three thousand five hundred and one"
        /// </summary>

        if (arguments.length === 1)
        {
            return Configuration.Configurator.getNumberToWordsConverter().convert(this, arguments[0]);
        }

        return Configuration.Configurator.getNumberToWordsConverter().convert(this);
    };

    Number.prototype.toOrdinalWords = function (): string
    {
        if (arguments.length === 1)
        {
            return Configuration.Configurator.getNumberToWordsConverter().convertToOrdinal(this, arguments[0]);
        }
        return Configuration.Configurator.getNumberToWordsConverter().convertToOrdinal(this);
    };
} 