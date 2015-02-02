interface String
{
    toQuantity(quantity: number, showQuantityAs?: Humanizer.ShowQuantityAs): string;
}

module Humanizer
{
    "use strict";

    export enum ShowQuantityAs
    {
        None,
        Numeric,
        Words
    }

    String.prototype.toQuantity = function (quantity: number, showQuantityAs: ShowQuantityAs = ShowQuantityAs.None): string
    {
        var transformedInput: string = quantity === 1 ? this.singularize(false) : this.pluralize(false);

        if (showQuantityAs === ShowQuantityAs.None)
        {
            return transformedInput;
        }

        switch (showQuantityAs)
        {
            case ShowQuantityAs.None:
                return transformedInput;
            case ShowQuantityAs.Numeric:
                return quantity.toString() + transformedInput;
            case ShowQuantityAs.Words:
                return quantity.toWords() + transformedInput;
        }
    };
} 