module Humanizer.Configuration
{
    export class LocaliserRegistry<T>
    {
        private localizer: Object;
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

        register(culture: string, localiser: T)
        register(culture: string, func: (c: string) => T)
        register()
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
            return this.defaultLocalizer;
        }
    }
}