module Humanizer.Bytes
{
    "use strict";

    export class ByteRate
    {
        size: ByteSize;
        interval: number;

        constructor(size: ByteSize, interval: number)
        {
            this.size = size;
            this.interval = interval;
        }

        humanize(timeUnit: Humanizer.Localisation.TimeUnit = Humanizer.Localisation.TimeUnit.Second): string
        {
            var displayInterval: number;
            var displayUnit: string;

            if (timeUnit === Humanizer.Localisation.TimeUnit.Second)
            {
                displayInterval = Number(1).seconds();
                displayUnit = "s";
            }
            else if (timeUnit === Humanizer.Localisation.TimeUnit.Minute)
            {
                displayInterval = Number(1).minutes();
                displayUnit = "min";
            }
            else if (timeUnit === Humanizer.Localisation.TimeUnit.Hour)
            {
                displayInterval = Number(1).hours();
                displayUnit = "hour";
            }
            else
            {
                throw Error("timeUnit must be Second, Minute, or Hour");
            }

            return (new ByteSize(this.size.bytes / this.interval.seconds() * displayInterval.seconds())).toString() + "/" + displayUnit;
        }
    }
} 