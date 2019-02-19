module Humanizer.Configuration
{
    "use strict";

    interface LocalizerDictionary<T>
    {
        [key: string]: (culture: string) => T;
    }

    export class LocaliserRegistry<T>
    {
        private localizer: LocalizerDictionary<T>;
        private defaultLocalizer: (culture: string) => T;

        constructor(_default: T)
        {
            this.localizer = {};
            this.defaultLocalizer = (culture: string): T =>
            {
                return _default;
            };
        }

        resolveForCulture(culture: string = Resources.getCurrentCulture()): T
        {
            return this.findLocaliser(culture)(culture);
        }

        register(culture: string, localiser: T): void
        register(culture: string, func: (c: string) => T): void
        register(): void
        {
            var culture: string = arguments[0];
            if (typeof arguments[1] === "function")
            {
                var func: (c: string) => T = arguments[1];
                this.localizer[culture] = func;
            }
            else
            {
                var localiser: T = arguments[1];
                this.localizer[culture] = (c: string): T => { return localiser; };
            }
        }

        private findLocaliser(culture: string): (culture: string) => T
        {
            var localiser: (culture: string) => T = this.localizer[culture];
            if (localiser !== undefined)
            {
                return localiser;
            }
            culture = culture.substr(0, 2);
            localiser = this.localizer[culture];
            if (localiser !== undefined)
            {
                return localiser;
            }
            return this.defaultLocalizer;
        }
    }
}