interface Number
{
    toWords(culture?: string): string;
    toWords(gender: Humanizer.GrammaticalGender, culture?: string): string;
    toOrdinalWords(culuture?: string): string;
    toOrdinalWords(gender: Humanizer.GrammaticalGender, culture?: string): string;
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

        var gender: GrammaticalGender = arguments.length >= 1 && typeof arguments[0] === "number" ? arguments[0] : null;
        var converter: Humanizer.Localisation.NumberToWords.INumberToWordsConverter = Configuration.Configurator.getNumberToWordsConverter(arguments.length > 0 && typeof arguments[arguments.length - 1] === "string" ? arguments[arguments.length - 1] : Resources.getCurrentCulture());
        if (gender === null)
        {
            return converter.convert(this);
        }
        return converter.convert(this, gender);
    };

    Number.prototype.toOrdinalWords = function (): string
    {
        var gender: GrammaticalGender = arguments.length >= 1 && typeof arguments[0] === "number" ? arguments[0] : null;
        var converter: Humanizer.Localisation.NumberToWords.INumberToWordsConverter = Configuration.Configurator.getNumberToWordsConverter(arguments.length > 0 && typeof arguments[arguments.length - 1] === "string" ? arguments[arguments.length - 1] : Resources.getCurrentCulture());
        if (gender === null)
        {
            return converter.convertToOrdinal(this);
        }
        return converter.convertToOrdinal(this, gender);
    };
} 