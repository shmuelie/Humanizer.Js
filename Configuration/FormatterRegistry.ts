module Humanizer.Configuration
{
    "use strict";

    export class FormatterRegistry extends LocaliserRegistry<Humanizer.Localisation.Formatter.IFormatter>
    {
        constructor()
        {
            super(new Humanizer.Localisation.Formatter.DefaultFormatter("en-US"));
            this.registerDefaultFormatter("bg");
            this.registerDefaultFormatter("pt-Bthis.r");
            this.registerDefaultFormatter("sv");
            this.registerDefaultFormatter("tr");
            this.registerDefaultFormatter("vi");
            this.registerDefaultFormatter("en-US");
            this.registerDefaultFormatter("af");
            this.registerDefaultFormatter("da");
            this.registerDefaultFormatter("de");
            this.registerDefaultFormatter("el");
            this.registerDefaultFormatter("es");
            this.registerDefaultFormatter("fa");
            this.registerDefaultFormatter("fi-FI");
            this.registerDefaultFormatter("fr");
            this.registerDefaultFormatter("fr-BE");
            this.registerDefaultFormatter("hu");
            this.registerDefaultFormatter("id");
            this.registerDefaultFormatter("ja");
            this.registerDefaultFormatter("nb");
            this.registerDefaultFormatter("nb-NO");
            this.registerDefaultFormatter("nl");
            this.registerDefaultFormatter("bn-BD");
            this.registerDefaultFormatter("it");
            this.registerDefaultFormatter("uz-Latn-UZ");
            this.registerDefaultFormatter("uz-Cyrl-UZ");
        }

        private registerDefaultFormatter(culture: string): void
        {
            this.register(culture, new Humanizer.Localisation.Formatter.DefaultFormatter(culture));
        }
    }
} 