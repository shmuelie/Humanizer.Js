import ByteSize from './ByteSize';
import { TimeUnit } from './common';
import { seconds, minutes, hours, toSeconds } from './HumanizeNumbers';

export default class ByteRate {
    size: ByteSize;
    interval: number;

    constructor(size: ByteSize, interval: number) {
        this.size = size;
        this.interval = interval;
    }

    humanize(timeUnit: TimeUnit = TimeUnit.Second): string {
        var displayInterval: number;
        var displayUnit: string;

        if (timeUnit === TimeUnit.Second) {
            displayInterval = seconds(1);
            displayUnit = "s";
        }
        else if (timeUnit === TimeUnit.Minute) {
            displayInterval = minutes(1);
            displayUnit = "min";
        }
        else if (timeUnit === TimeUnit.Hour) {
            displayInterval = hours(1);
            displayUnit = "hour";
        }
        else {
            throw Error("timeUnit must be Second, Minute, or Hour");
        }

        return (new ByteSize(this.size.bytes / toSeconds(this.interval) * toSeconds(displayInterval))).toString() + "/" + displayUnit;
    }
}