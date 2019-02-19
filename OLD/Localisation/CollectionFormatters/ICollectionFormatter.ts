module Humanizer.Localisation.CollectionFormatters
{
    /**
     * An interface you should implement to localize Humanize for collections
     */
    export interface ICollectionFormatter
    {
        /**
         * Formats the collection for display, calling toString() on each object.
         */
        humanize<T>(collection: T[]): string;
        /**
         * Formats the collection for display, calling `objectFormatter` on each object.
         */
        humanize<T>(collection: T[], objectFormatter: (item: T) => string): string;
        /**
         * Formats the collection for display, calling toString() on each object and using `separator` before the final item.
         */
        humanize<T>(collection: T[], separator: string): string;
        /**
         * Formats the collection for display, calling `objectFormatter` on each object and using `separator` before the final item.
         */
        humanize<T>(collection: T[], objectFormatter: (item: T) => string, separator: string): string;
    }
} 