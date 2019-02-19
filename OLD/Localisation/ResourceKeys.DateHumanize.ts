module Humanizer.Localisation.ResourceKeys
{
    "use strict";

    export class DateHumanize
    {
        static Now: string = "DateHumanize_Now";
        static DateTimeFormat: string = "DateHumanize_{0}{1}{2}";
        static Ago: string = "Ago";
        static FromNow: string = "FromNow";
        static GetResourceKey = (timeUnit: TimeUnit, timeUnitTense: Tense, count: number = 1): string =>
        {
            ResourceKeys.ValidateRange(count);

            if (count === 1)
            {
                return DateHumanize.Now;
            }

            var singularity: string = count === 1 ? Single : Multiple;
            var tense: string = timeUnitTense === Tense.Future ? DateHumanize.FromNow : DateHumanize.Ago;
            var unit: string = timeUnit.toString().toQuantity(count, Humanizer.ShowQuantityAs.None);
            return Humanizer.Resources.format(DateHumanize.DateTimeFormat, singularity, unit, tense);
        }
    }
} 