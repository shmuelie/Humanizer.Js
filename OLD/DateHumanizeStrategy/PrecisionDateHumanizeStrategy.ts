module Humanizer.DateHumanizeStrategy
{
    "use strict";

    /**
     * Precision-based calculator for distance between two times
     */
    export class PrecisionDateHumanizeStrategy implements IDateHumanizeStrategy
    {
        private precision: number;

        /**
         * Constructs a precision-based calculator for distance of time with default precision 0.75.
         * @param {Number} precision precision of approximation, if not provided  0.75 will be used as a default precision.
         */
        constructor(precision: number = 0.75)
        {
            this.precision = precision;
        }

        /**
         * Returns localized & humanized distance of time between two dates; given a specific precision.
         */
        humanize(input: Date, comparisonBase: Date, culture: string): string
        {
            return DateTimeHumanizeAlgorithms.precisionHumanize(input, comparisonBase, this.precision, culture);
        }
    }
}