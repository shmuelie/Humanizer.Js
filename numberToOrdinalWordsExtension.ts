interface Number
{
    toOrdinalWords(): string;
}

module Humanizer
{
    "use strict";

    function exceptionNumberToWords(num: number): string
    {
        var exceptions = {
            1: "first",
            2: "second",
            3: "third",
            4: "fourth",
            5: "fifth",
            8: "eighth",
            9: "ninth",
            12: "twelfth"
        };
        if (exceptions.hasOwnProperty(num.toString()))
        {
            return exceptions[num];
        }
        return null;
    }

    function removeOnePrefix(towords: string): string
    {
        if (towords.indexOf("one") === 0)
        {
            towords = towords.substr(4);
        }
        return towords;
    }

    function normalNumberToWords(num: number)
    {
        var towords: string = num.toWords().replace("-", " ");

        towords = removeOnePrefix(towords);

        if (towords.lastIndexOf("y") === towords.length - 1)
        {
            towords = towords.substr(0, towords.length - 1) + "ie";
        }

        return towords + "th";
    }

    /**
     * 1.toOrdinalWords() -> "first"
     */
    Number.prototype.toOrdinalWords = function (): string
    {
        /// <summary>
        ///     1.toOrdinalWords() -> "first"
        /// </summary>

        var towords: string;

        var ex: string = exceptionNumberToWords(this);
        if (ex !== null)
        {
            return ex;
        }

        if (this > 20)
        {
            var exceptionPart: string = exceptionNumberToWords(this % 10);
            if (exceptionPart !== null)
            {
                var normalPart: number = this - this % 10;
                towords = removeOnePrefix(normalPart.toWords());
                return towords + " " + exceptionPart;
            }
        }

        return normalNumberToWords(this);
    };
} 