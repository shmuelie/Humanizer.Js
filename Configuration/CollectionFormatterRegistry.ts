module Humanizer.Configuration
{
    export class CollectionFormatterRegistry extends LocaliserRegistry<Localisation.CollectionFormatters.ICollectionFormatter>
    {
        constructor()
        {
            super(new Localisation.CollectionFormatters.DefaultCollectionFormatter());
            this.register("en", new Localisation.CollectionFormatters.EnglishCollectionFormatter());
        }
    }
} 