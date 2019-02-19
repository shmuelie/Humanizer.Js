interface String
{
    fromRoman(): number;
}
interface Number
{
    toRoman(): string;
}

module Humanizer
{
    "use strict";

    interface RomanNumberalsDictionary
    {
        [letter: string]: number;
    }

    var romanNumberals: RomanNumberalsDictionary = {
        "M": 1000,
        "CM": 900,
        "D": 500,
        "CD": 400,
        "C": 100,
        "XC": 90,
        "L": 50,
        "XL": 40,
        "X": 10,
        "IX": 9,
        "V": 5,
        "IV": 4,
        "I": 1
    };

    var validRomanNumerals: RegExp = /^(?:(?=[MDCLXVI])((M{0,3})((C[DM])|(D?C{0,3}))?((X[LC])|(L?XX{0,2})|L)?((I[VX])|(V?(II{0,2}))|V)?))$/;

    /**
     * Converts Roman numbers into integer
     * @returns {Number} Human-readable number
     */
    String.prototype.fromRoman = function (): number
    {
        /// <summary>
        ///     Converts Roman numbers into integer
        /// </summary>
        /// <returns type="Number" integer="true">
        ///     Human-readable number
        /// </returns>

        var input: string = this.toUpperCase().trim();
        var length: number = input.length;

        if ((length === 0) || !validRomanNumerals.test(input))
        {
            throw new Error("Empty or invalid Roman numeral string.");
        }

        var total: number = 0;
        var i: number = length;

        while (i > 0)
        {
            var digit = romanNumberals[input.charAt(--i)];

            if (i > 0)
            {
                var previousDigit: number = romanNumberals[input.charAt(i - 1)];

                if (previousDigit < digit)
                {
                    digit -= previousDigit;
                    i--;
                }
            }
            total += digit;
        }

        return total;
    };

    /**
     * Converts the input to Roman number
     * @returns {String} Roman number
     */
    Number.prototype.toRoman = function (): string
    {
        /// <summary>
        ///     Converts the input to Roman number
        /// </summary>
        /// <returns type="String">
        ///     Roman number
        /// </returns>

        var minValue: number = 1;
        var maxValue: number = 3999;

        if ((this < minValue) || (this > maxValue))
        {
            throw new Error("Out of range");
        }

        var sb: string[] = [];
        var input: number = this;

        for (var key in romanNumberals)
        {
            if (Object.prototype.hasOwnProperty.call(romanNumberals, romanNumberals))
            {
                var value: number = romanNumberals[key];
                while (input / value > 0)
                {
                    sb.push(key);
                    input -= value;
                }
            }
        }

        return sb.join("");
    };
} 