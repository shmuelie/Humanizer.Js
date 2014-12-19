module Humanizer.Localisation.ResourceKeys
{
    export var Single: string = "Single";
    export var Multiple: string = "Multiple";
    export var ValidateRange = (count: number): void =>
    {
        if (count < 0)
        {
            throw new RangeError();
        }
    };
} 