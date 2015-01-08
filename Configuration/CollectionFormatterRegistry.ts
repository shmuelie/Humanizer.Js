module Humanizer.Configuration
{
    export class CollectionFormatterRegistry extends LocaliserRegistry<Humanizer.Localisation.CollectionFormatters.ICollectionFormatter>
    {
        constructor()
        {
            super(new Humanizer.Localisation.CollectionFormatters.DefaultCollectionFormatter());
            this.register("en", new Humanizer.Localisation.CollectionFormatters.EnglishCollectionFormatter());
            this.register("en-US", new Humanizer.Localisation.CollectionFormatters.EnglishCollectionFormatter());
        }
    }
} 