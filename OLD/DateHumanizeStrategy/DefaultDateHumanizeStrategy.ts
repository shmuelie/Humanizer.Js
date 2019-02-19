module Humanizer.DateHumanizeStrategy
{
    "use strict";

    /**
     * The default 'distance of time' -> words calculator.
     */
    export class DefaultDateHumanizeStrategy implements IDateHumanizeStrategy
    {
        /**
         * Calculates the distance of time in words between two provided dates
         */
        humanize(input: Date, comparisonBase: Date, culture: string): string
        {
            return DateTimeHumanizeAlgorithms.defaultHumanize(input, comparisonBase, culture);
        }
    }
}