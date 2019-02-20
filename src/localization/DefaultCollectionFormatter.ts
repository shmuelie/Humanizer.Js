import { ICollectionFormatter } from 'localization';

export class DefaultCollectionFormatter implements ICollectionFormatter {
    defaultSeparator: string = "";

    humanize<T>(collection: T[]): string;
    humanize<T>(collection: T[], separator: string): string;
    humanize<T>(collection: T[], objectFormatter: (item: T) => string): string;
    humanize<T>(collection: T[], objectFormatter: (item: T) => string, separator: string): string;
    humanize<T>(collection: T[], objectFormatterOrSeparator?: ((item: T) => string) | string, separator?: string): string {
        switch (typeof objectFormatterOrSeparator) {
            case "undefined":
                return this.humanize_collection<T>(collection);
            case "string":
                return this.humanize_collection_separator<T>(collection, objectFormatterOrSeparator);
            case "function":
                if (separator) {
                    return this.humanizer_collection_objectFormatter_separator<T>(collection, objectFormatterOrSeparator, separator);
                }
                return this.humanizer_collection_objectFormatter<T>(collection, objectFormatterOrSeparator);
        }
    }

    humanize_collection<T>(collection: T[]): string {
        return this.humanizer_collection_objectFormatter_separator<T>(collection, (item: T): string => {
            return item.toString();
        }, this.defaultSeparator);
    }

    humanize_collection_separator<T>(collection: T[], separator: string): string {
        return this.humanizer_collection_objectFormatter_separator<T>(collection, (item: T): string => {
            return item.toString();
        }, separator);
    }

    humanizer_collection_objectFormatter<T>(collection: T[], objectFormatter: (item: T) => string): string {
        return this.humanizer_collection_objectFormatter_separator<T>(collection, objectFormatter, this.defaultSeparator);
    }

    humanizer_collection_objectFormatter_separator<T>(_collection: T[], _objectFormatter: (item: T) => string, _separator: string): string {
        throw new Error("A collection formatter for the current culture has not been implemented yet.");
    }
}