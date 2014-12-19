module Humanizer.Localisation.ResourceKeys
{
    "use strict";

    export class TimeHumanize
    {
        static TimeFormat: string = "TimeHumanize_{0}{1}{2}";
        static Zero: string = "TimeHumanize_Zero";
        static GetResourceKey = (unit: TimeUnit, count: number = 1): string =>
        {
            ResourceKeys.ValidateRange(count);

            if (count === 0)
            {
                return TimeHumanize.Zero;
            }

            return Humanizer.Resources.format(TimeHumanize.TimeFormat, count === 1 ? ResourceKeys.Single : ResourceKeys.Multiple, TimeUnit[unit], count === 1 ? "" : "s");
        }
    }
}