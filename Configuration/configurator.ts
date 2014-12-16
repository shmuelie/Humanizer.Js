module Humanizer.Configuration.Configurator
{
    var formatter: LocaliserRegistry<Localisation.Formatter.IFormatter> = new FormatterRegistry();

    export function getFormatter(culture: string): Localisation.Formatter.IFormatter
    {
        return formatter.resolveForCulture(culture);
    }
} 