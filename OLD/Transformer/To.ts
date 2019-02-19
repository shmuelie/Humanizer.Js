/// <reference path="ToTitleCase.ts" />
/// <reference path="ToUpperCase.ts" />
/// <reference path="ToLowerCase.ts" />
/// <reference path="ToSentenceCase.ts" />

interface String
{
    transform(...transformers: Humanizer.IStringTransformer[]): string;
}

module Humanizer
{
    "use strict";

    /** Transforms a string using the provided transformers. Transformations are applied in the provided order. */
    String.prototype.transform = function (...transformers: IStringTransformer[])
    {
        /// <summary>
        ///     Transforms a string using the provided transformers. Transformations are applied in the provided order.
        /// </summary>

        var str: string = this;
        var length: number = transformers.length;
        for (var i: number = 0; i < length; i++)
        {
            str = transformers[i].transform(str);
        }
        return str;
    };

    export class To
    {
        static TitleCase: IStringTransformer = new ToTitleCase();
        static UpperCase: IStringTransformer = new ToUpperCase();
        static LowerCase: IStringTransformer = new ToLowerCase();
        static SentenceCase: IStringTransformer = new ToSentenceCase();
    }
}