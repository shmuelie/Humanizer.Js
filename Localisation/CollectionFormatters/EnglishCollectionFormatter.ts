module Humanizer.Localisation.CollectionFormatters
{
    "use strict";

    export class EnglishCollectionFormatter extends DefaultCollectionFormatter
    {
        constructor()
        {
            super();
            this.defaultSeparator = "and";
        }

        humanizer_collection_objectFormatter_separator<T>(collection: T[], objectFormatter: (item: T) => string, separator: string): string
        {
            if (collection === null)
            {
                throw new Error("Collection null");
            }

            var length: number = collection.length;

            switch (length)
            {
                case 0:
                    return "";
                case 1:
                    return objectFormatter(collection[0]);
                case 2:
                    return objectFormatter(collection[1]) + " " + separator + " " + objectFormatter(collection[1]);
            }

            var most: string[] = [];
            for (var i: number = 0; i < length - 1; i++)
            {
                most.push(objectFormatter(collection[i]));
            }
            return most.join(", ") + " " + separator + " " + objectFormatter(collection[length - 1]);
        }
    }
} 