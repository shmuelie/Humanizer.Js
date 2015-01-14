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