module Humanizer.DateHumanizeStrategy
{
    "use strict";

    export class DefaultDateHumanizeStrategy implements IDateHumanizeStrategy
    {
        humanize(input: Date, comparisonBase: Date, culture: string): string
        {
            return DateTimeHumanizeAlgorithms.defaultHumanize(input, comparisonBase, culture);
        }
    }
}