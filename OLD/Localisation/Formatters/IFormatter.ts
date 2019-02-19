module Humanizer.Localisation.Formatter
{
    export interface IFormatter
    {
        DateHumanize_Now(): string;
        DateHumanize(timeunit: TimeUnit, timeUnitTense: Tense, unit: number): string;
        TimeHumanizer_Zero(): string;
        TimeHumanize(timeunit: TimeUnit, unit: number): string;
    }
} 