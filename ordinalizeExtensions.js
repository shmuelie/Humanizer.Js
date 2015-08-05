var Humanizer;
(function (Humanizer) {
    "use strict";
    /** Turns a number into an ordinal string used to denote the position in an ordered sequence such as 1st, 2nd, 3rd, 4th. */
    String.prototype.ordinalize = function (gender) {
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
        if (gender === undefined) {
            return Humanizer.Configuration.Configurator.getOrdinalizer().convert(parseInt(this, 10), this);
        }
        else {
            return Humanizer.Configuration.Configurator.getOrdinalizer().convert(parseInt(this, 10), this, gender);
        }
    };
    /** Turns a number into an ordinal number used to denote the position in an ordered sequence such as 1st, 2nd, 3rd, 4th. */
    Number.prototype.ordinalize = function (gender) {
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
        if (gender === undefined) {
            return Humanizer.Configuration.Configurator.getOrdinalizer().convert(this, this.toString());
        }
        else {
            return Humanizer.Configuration.Configurator.getOrdinalizer().convert(this, this.String(), gender);
        }
    };
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=ordinalizeExtensions.js.map