var Humanizer;
(function (Humanizer) {
    var Localisation;
    (function (Localisation) {
        var Formatter;
        (function (Formatter) {
            "use strict";
            function format(resourceKey, culture, num) {
                var str = Humanizer.Resources.getResource(culture)[resourceKey];
                if (num === undefined) {
                    return str;
                }
                else {
                    return Humanizer.Resources.format(str, num);
                }
            }
            function getResourceForDate(unit, timeUnitTense, count, culture) {
                var resourceKey = Localisation.ResourceKeys.DateHumanize.GetResourceKey(unit, timeUnitTense, count);
                return count === 1 ? format(resourceKey, culture) : format(resourceKey, culture, count);
            }
            function getResourceForTime(unit, count, culture) {
                var resourceKey = Localisation.ResourceKeys.TimeHumanize.GetResourceKey(unit, count);
                return count === 1 ? format(resourceKey, culture) : format(resourceKey, culture, count);
            }
            var DefaultFormatter = (function () {
                function DefaultFormatter(culture) {
                    this.culture = culture;
                }
                DefaultFormatter.prototype.DateHumanize_Now = function () {
                    return getResourceForDate(Localisation.TimeUnit.Millisecond, 1 /* Past */, 0, this.culture);
                };
                DefaultFormatter.prototype.DateHumanize = function (timeunit, timeUnitTense, unit) {
                    return getResourceForDate(timeunit, timeUnitTense, unit, this.culture);
                };
                DefaultFormatter.prototype.TimeHumanizer_Zero = function () {
                    return getResourceForTime(Localisation.TimeUnit.Millisecond, 0, this.culture);
                };
                DefaultFormatter.prototype.TimeHumanize = function (timeunit, unit) {
                    return getResourceForTime(timeunit, unit, this.culture);
                };
                return DefaultFormatter;
            })();
            Formatter.DefaultFormatter = DefaultFormatter;
        })(Formatter = Localisation.Formatter || (Localisation.Formatter = {}));
    })(Localisation = Humanizer.Localisation || (Humanizer.Localisation = {}));
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=DefaultFormatter.js.map