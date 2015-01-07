interface Array<T>
{
    /**
     * Formats the collection for display, calling ToString() on each object and using the default separator for the current culture.
     */
    humanize(): string;
    /**
     * Formats the collection for display, calling `objectFormatter` on each object and using the default separator for the current culture.
     */
    humanize(displayFormatter: (item: T) => string): string;
    /**
     * Formats the collection for display, calling ToString() on each object and using the provided separator.
     */
    humanize(separator: string): string;
    /**
     * Formats the collection for display, calling `objectFormatter` on each object and using the provided separator.
     */
    humanize(displayFormatter: (item: T) => string, separator: string): string;
}

module Humanizer
{
    "use strict";

    class Arr<T>
    {
        /**
         * Formats the collection for display, calling `objectFormatter` on each object and using the default separator for the current culture.
         */
        humanize(displayFormatter: (item: T) => string): string;
        /**
         * Formats the collection for display, calling ToString() on each object and using the provided separator.
         */
        humanize(separator: string): string;
        /**
         * Formats the collection for display, calling `objectFormatter` on each object and using the provided separator.
         */
        humanize(displayFormatter: (item: T) => string, separator: string): string;
        /**
         * Formats the collection for display, calling ToString() on each object and using the default separator for the current culture.
         */
        humanize(): string;
        humanize(): string
        {
            switch (arguments.length)
            {
                case 0:
                    return Configuration.Configurator.getCollectionFormatters().humanize(<T[]>this);
                case 1:
                    if (typeof arguments[0] === "string")
                    {
                        return Configuration.Configurator.getCollectionFormatters().humanize(<T[]>this, <string>arguments[0]);
                    }
                    else
                    {
                        var df: (item: T) => string = arguments[0];
                        return Configuration.Configurator.getCollectionFormatters().humanize(<T[]>this, df);
                    }
                case 2:
                    return Configuration.Configurator.getCollectionFormatters().humanize(<T[]>this, arguments[0], arguments[1]);
                default:
                    throw new Error("Unknown call");
            }
        }
    }

    Array.prototype.humanize = Arr.prototype.humanize;
}