module Humanizer.Localisation.CollectionFormatters
{
    "use strict";

    export class DefaultCollectionFormatter implements ICollectionFormatter
    {
        defaultSeparator: string = "";

        humanize<T>(collection: T[], objectFormatter: (item: T) => string, separator: string): string
        humanize<T>(collection: T[], objectFormatter: (item: T) => string): string
        humanize<T>(collection: T[], separator: string): string
        humanize<T>(collection: T[]): string
        humanize<T>(): string
        {
            var collection: T[] = arguments[0];
            switch (arguments.length)
            {
                case 1:
                    return this.humanize_collection<T>(collection);
                case 2:
                    if (typeof arguments[1] === "string")
                    {
                        return this.humanize_collection_separator<T>(collection, arguments[1]);
                    }
                    return this.humanizer_collection_objectFormatter<T>(collection, arguments[1]);
                case 3:
                    return this.humanizer_collection_objectFormatter_separator<T>(collection, arguments[1], arguments[2]);
            }
        }

        humanize_collection<T>(collection: T[]): string
        {
            return this.humanizer_collection_objectFormatter_separator<T>(collection, (item: T): string =>
            {
                return item.toString();
            }, this.defaultSeparator);
        }

        humanize_collection_separator<T>(collection: T[], separator: string): string
        {
            return this.humanizer_collection_objectFormatter_separator<T>(collection, (item: T): string =>
            {
                return item.toString();
            }, separator);
        }

        humanizer_collection_objectFormatter<T>(collection: T[], objectFormatter: (item: T) => string): string
        {
            return this.humanizer_collection_objectFormatter_separator<T>(collection, objectFormatter, this.defaultSeparator);
        }

        humanizer_collection_objectFormatter_separator<T>(collection: T[], objectFormatter: (item: T) => string, separator: string): string
        {
            throw new Error("A collection formatter for the current culture has not been implemented yet.");
        }
    }
} 