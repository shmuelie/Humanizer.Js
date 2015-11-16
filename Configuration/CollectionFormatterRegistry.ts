/// <reference path="LocaliserRegistry.ts" />
/// <reference path="../Localisation/CollectionFormatters/DefaultCollectionFormatter.ts" />
/// <reference path="../Localisation/CollectionFormatters/OxfordStyleCollectionFormatter.ts" />

module Humanizer.Configuration
{
    export class CollectionFormatterRegistry extends LocaliserRegistry<Localisation.CollectionFormatters.ICollectionFormatter>
    {
        constructor()
        {
            super(new Localisation.CollectionFormatters.DefaultCollectionFormatter());
            this.register("en", new Localisation.CollectionFormatters.OxfordStyleCollectionFormatter());
        }
    }
}