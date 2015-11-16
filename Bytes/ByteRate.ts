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

        humanize(timeUnit: Localisation.TimeUnit = Localisation.TimeUnit.Second): string
        {
            var displayInterval: number;
            var displayUnit: string;

            if (timeUnit === Localisation.TimeUnit.Second)
            {
                displayInterval = (1).seconds();
                displayUnit = "s";
            }
            else if (timeUnit === Localisation.TimeUnit.Minute)
            {
                displayInterval = (1).minutes();
                displayUnit = "min";
            }
            else if (timeUnit === Localisation.TimeUnit.Hour)
            {
                displayInterval = (1).hours();
                displayUnit = "hour";
            }
            else
            {
                throw Error("timeUnit must be Second, Minute, or Hour");
            }

            return (new ByteSize(this.size.bytes / this.interval.toSeconds() * displayInterval.toSeconds())).toString() + "/" + displayUnit;
        }
    }
}