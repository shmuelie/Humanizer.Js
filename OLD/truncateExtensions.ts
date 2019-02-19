interface String
{
    truncate(length: number): string;
    truncate(length: number, truncator: Humanizer.ITruncator, from?: Humanizer.TruncateFrom): string;
    truncate(length: number, truncationString: string, from?: Humanizer.TruncateFrom): string;
    truncate(length: number, truncationString: string, truncator: Humanizer.ITruncator, from?: Humanizer.TruncateFrom): string;
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

    String.prototype.truncate = function (): string
    {
        var length: number = arguments[0];
        var truncationString: string = "…";
        var from: TruncateFrom = TruncateFrom.Right;
        var truncator: ITruncator = Truncator.FixedLength;
        if (arguments.length > 1)
        {
            if (typeof arguments[1] === "string")
            {
                truncationString = arguments[1];
            }
            else
            {
                truncator = arguments[1];
            }
        }
        if (arguments.length > 2)
        {
            if (typeof arguments[2] === "number")
            {
                from = arguments[2];
            }
            else
            {
                truncator = arguments[2];
            }
        }
        if (arguments.length > 3)
        {
            from = arguments[3];
        }

        return truncator.truncate(this, length, truncationString, from);
    };
} 