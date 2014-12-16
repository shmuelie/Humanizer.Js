var Humanizer;
(function (Humanizer) {
    (function (Resources) {
        "use strict";

        function getCurrentCulture() {
            return navigator.language || navigator.userLanguage || "en-US";
        }
        Resources.getCurrentCulture = getCurrentCulture;

        function getResource(culture) {
            var r = Humanizer.Resources[culture];
            if (r !== null) {
                return r;
            }
            return Humanizer.Resources["en-US"];
        }
        Resources.getResource = getResource;

        function format(str) {
            var obj = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                obj[_i] = arguments[_i + 1];
            }
            var worker = str;
            for (var i = 0; i < obj.length; i++) {
                worker = worker.replace("{" + i + "}", obj[i].toString());
            }
            return worker;
        }
        Resources.format = format;
    })(Humanizer.Resources || (Humanizer.Resources = {}));
    var Resources = Humanizer.Resources;
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=resource.js.map
