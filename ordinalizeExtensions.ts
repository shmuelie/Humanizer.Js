interface String
{
    ordinalize(gender: Humanizer.GrammaticalGender): string;
    ordinalize(): string;
}
interface Number
{
    ordinalize(gender: Humanizer.GrammaticalGender): string;
    ordinalize(): string;
}

module Humanizer
{
    "use strict";

    /** Turns a number into an ordinal string used to denote the position in an ordered sequence such as 1st, 2nd, 3rd, 4th. */
    String.prototype.ordinalize = function (gender?: Humanizer.GrammaticalGender): string
    {
        /// <signature>
        ///     <summary>
        ///         Turns a number into an ordinal string used to denote the position in an ordered sequence such as 1st, 2nd, 3rd, 4th.
        ///     </summary>
        /// </signature>
        /// <signature>
        ///     <summary>
        ///         Turns a number into an ordinal string used to denote the position in an ordered sequence such as 1st, 2nd, 3rd, 4th.
        ///     </summary>
        ///     <param name="gender" type="Humanizer.GrammaticalGender">
        ///         The grammatical gender to use for output words
        ///     </param>
        /// </signature>

        if (gender === undefined)
        {
            return Configuration.Configurator.getOrdinalizer().convert(parseInt(this, 10), this);
        }
        else
        {
            return Configuration.Configurator.getOrdinalizer().convert(parseInt(this, 10), this, gender);
        }
    };

    /** Turns a number into an ordinal number used to denote the position in an ordered sequence such as 1st, 2nd, 3rd, 4th. */
    Number.prototype.ordinalize = function (gender?: Humanizer.GrammaticalGender): string
    {
        /// <signature>
        ///     <summary>
        ///         Turns a number into an ordinal string used to denote the position in an ordered sequence such as 1st, 2nd, 3rd, 4th.
        ///     </summary>
        /// </signature>
        /// <signature>
        ///     <summary>
        ///         Turns a number into an ordinal string used to denote the position in an ordered sequence such as 1st, 2nd, 3rd, 4th.
        ///     </summary>
        ///     <param name="gender" type="Humanizer.GrammaticalGender">
        ///         The grammatical gender to use for output words
        ///     </param>
        /// </signature>

        if (gender === undefined)
        {
            return Configuration.Configurator.getOrdinalizer().convert(this, this.toString());
        }
        else
        {
            return Configuration.Configurator.getOrdinalizer().convert(this, this.String(), gender);
        }
    };
} 