module Humanizer.DateHumanizeStrategy
{
    export interface IDateHumanizeStrategy
    {
        humanize(input: Date, comparisonBase: Date, culture: string): string;
    }
}