interface String
{
    humanize(): string
    humanize(casing: Humanizer.LetterCasing): string;
}

module Humanizer
{
    "use strict";

    function fromUnderscoreDashSeparatedWords(input: string): string
    {
        return input.split(/[_-]/g, Number.MAX_VALUE).join(" ");
    }

    function fromPascalCase(input: string): string
    {
        var pascalCaseRegex: RegExp = /(?:([A-Z][a-z]+)(?=[A-Z]))|(?:([a-z]+)(?=[A-Z]))|(?:(\d+))|(?:([A-Z][a-z]+))|([A-Z]+)/g;
        var matches: string[] = input.match(pascalCaseRegex) || [];
        var matchesLength: number = matches.length;
        for (var i: number = 0; i < matchesLength; i++)
        {
            var word: string = matches[i] || "";
            matches[i] = (word.toUpperCase() === word) && (word.length > 1) ? word : word.toLowerCase();
        }
        var result: string = matches.join(" ");
        result = result.charAt(0).toUpperCase() + result.substr(1);
        return result.replace(" i ", " I ");
    }

    function humanize(input: string): string
    {
        if (input === input.toUpperCase())
        {
            return input;
        }

        if ((input.indexOf("_") !== -1) || (input.indexOf("-") !== -1))
        {
            return fromUnderscoreDashSeparatedWords(input);
        }

        return fromPascalCase(input);
    }

    /**
     * Humanizes the input string
     * @param {Humanizer.LetterCasing} [casing] The desired casing for the output
     */
    String.prototype.humanize = function (casing?: Humanizer.LetterCasing): string
    {
        /// <signature>
        ///     <summary>
        ///         Humanizes the input string; e.g. Underscored_input_String_is_turned_INTO_sentence -> 'Underscored input String is turned INTO sentence'
        ///     </summary>
        /// </signature>
        /// <signature>
        ///     <summary>
        ///         Humanized the input string based on the provided casing
        ///     </summary>
        ///     <param name="casing" type="Humanizer.LetterCasing">
        ///         The desired casing for the output
        ///     </param>
        /// </signature>

        if ((casing !== null) && (casing !== undefined))
        {
            return humanize(this).applyCasing(casing);
        }
        else
        {
            return humanize(this);
        }
    };
} 