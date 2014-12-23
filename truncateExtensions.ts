interface String
{
    truncate(length: number, truncator?: Humanizer.ITruncator, from?: Humanizer.TruncateFrom): string;
    truncateWith(length: number, truncationString: string, truncator?: Humanizer.ITruncator, from?: Humanizer.TruncateFrom): string;
}

module Humanizer
{
    "use strict";

    /**
     * Truncation location for humanizer
     * @enum
     * @readonly
     */
    export enum TruncateFrom
    {
        /** Truncate letters from the left (start) of the string */
        Left,
        /** Truncate letters from the right (end) of the string */
        Right
    }

    String.prototype.truncate = function (length: number, truncator: ITruncator = Truncator.FixedLength, from: TruncateFrom = TruncateFrom.Right): string
    {
        return truncator.truncate(this, length, "…", from);
    };

    String.prototype.truncateWith = function (length: number, truncationString: string, truncator: ITruncator = Truncator.FixedLength, from: TruncateFrom = TruncateFrom.Right): string
    {
        return truncator.truncate(this, length, truncationString, from);
    };
} 