var Humanizer;
(function (Humanizer) {
    var Resources;
    (function (Resources) {
        "use strict";
        Resources._cultures = {};
        function getCurrentCulture() {
            return navigator.language || navigator.userLanguage || "en-US";
        }
        Resources.getCurrentCulture = getCurrentCulture;
        function getResource(culture) {
            var r = Humanizer.Resources._cultures[culture];
            if (r !== undefined) {
                return r;
            }
            return Humanizer.Resources._cultures["en-US"];
        }
        Resources.getResource = getResource;
        function format(str) {
            var obj = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                obj[_i - 1] = arguments[_i];
            }
            var worker = str;
            for (var i = 0; i < obj.length; i++) {
                worker = worker.replace("{" + i + "}", obj[i].toString());
            }
            return worker;
        }
        Resources.format = format;
    })(Resources = Humanizer.Resources || (Humanizer.Resources = {}));
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=resource.js.map