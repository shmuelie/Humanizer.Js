module Humanizer.Localisation.Formatter
{
    "use strict";

    function format(resourceKey: string, culture: string, num?: number): string
    {
        var str: string = (<any>Resources.getResource(culture))[resourceKey];
        if (num === undefined)
        {
            return str;
        }
        else
        {
            return Resources.format(str, num);
        }
    }

    function getResourceForDate(unit: TimeUnit, timeUnitTense: Tense, count: number, culture: string): string
    {
        var resourceKey: string = ResourceKeys.DateHumanize.GetResourceKey(unit, timeUnitTense, count);
        return count === 1 ? format(resourceKey, culture) : format(resourceKey, culture, count);
    }

    function getResourceForTime(unit: TimeUnit, count: number, culture: string): string
    {
        var resourceKey: string = ResourceKeys.TimeHumanize.GetResourceKey(unit, count);
        return count === 1 ? format(resourceKey, culture) : format(resourceKey, culture, count);
    }


    export class DefaultFormatter implements IFormatter
    {
        private culture: string;

        constructor(culture: string)
        {
            this.culture = culture;
        }

        DateHumanize_Now(): string
        {
            return getResourceForDate(TimeUnit.Millisecond, Tense.Past, 0, this.culture);
        }

        DateHumanize(timeunit: TimeUnit, timeUnitTense: Tense, unit: number): string
        {
            return getResourceForDate(timeunit, timeUnitTense, unit, this.culture);
        }

        TimeHumanizer_Zero(): string
        {
            return getResourceForTime(TimeUnit.Millisecond, 0, this.culture);
        }

        TimeHumanize(timeunit: TimeUnit, unit: number): string
        {
            return getResourceForTime(timeunit, unit, this.culture);
        }
    }
} 