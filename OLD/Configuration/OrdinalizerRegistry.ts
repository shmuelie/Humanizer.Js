/// <reference path="LocaliserRegistry.ts" />
/// <reference path="../Localisation/Ordinalizers/DefaultOrdinalizer.ts" />
/// <reference path="../Localisation/Ordinalizers/EnglishOrdinalizer.ts" />

module Humanizer.Configuration
{
    export class OrdinalizerRegistry extends LocaliserRegistry<Localisation.Ordinalizers.IOrdinalizer>
    {
        constructor()
        {
            super(new Localisation.Ordinalizers.DefaultOrdinalizer());
            this.register("en", new Localisation.Ordinalizers.EnglishOrdinalizer());
        }
    }
}