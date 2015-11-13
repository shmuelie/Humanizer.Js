module Humanizer.DateHumanizeStrategy
{
    "use strict";

    export class PrecisionDateHumanizeStrategy implements IDateHumanizeStrategy
    {
        private precision: number;

        constructor(precision: number = 0.75)
        {
            this.precision = precision;
        }

        humanize(input: Date, comparisonBase: Date, culture: string): string
        {
            return DateTimeHumanizeAlgorithms.precisionHumanize(input, comparisonBase, this.precision, culture);
        }
    }
}