interface String
{
    ordinalize(): string;
}
interface Number
{
    ordinalize(): string;
}

module Humanizer
{
    "use strict";

    function ordinalize(num: number, numberString: string): string
    {
        var nMod100: number = num % 100;

        if (nMod100 >= 11 && nMod100 <= 13)
        {
            return numberString + "th";
        }

        switch (num % 10)
        {
            case 1:
                return numberString + "st";
            case 2:
                return numberString + "nd";
            case 3:
                return numberString + "rd";
            default:
                return numberString + "th";
        }
    }

    //** Turns a number into an ordinal string used to denote the position in an ordered sequence such as 1st, 2nd, 3rd, 4th. */
    String.prototype.ordinalize = function (): string
    {
        /// <summary>
        ///     Turns a number into an ordinal string used to denote the position in an ordered sequence such as 1st, 2nd, 3rd, 4th.
        /// </summary>

        return  ordinalize(Number(this), this);
    };

    /** Turns a number into an ordinal number used to denote the position in an ordered sequence such as 1st, 2nd, 3rd, 4th. */
    Number.prototype.ordinalize = function (): string
    {
        /// <summary>
        ///     Turns a number into an ordinal number used to denote the position in an ordered sequence such as 1st, 2nd, 3rd, 4th.
        /// </summary>

        return ordinalize(this, this.toString());
    };
} 