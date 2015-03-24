var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Humanizer;
(function (Humanizer) {
    (function (Localisation) {
        (function (CollectionFormatters) {
            "use strict";

            var OxfordStyleCollectionFormatter = (function (_super) {
                __extends(OxfordStyleCollectionFormatter, _super);
                function OxfordStyleCollectionFormatter(defaultSeparator) {
                    if (typeof defaultSeparator === "undefined") { defaultSeparator = "and"; }
                    _super.call(this);
                    this.defaultSeparator = defaultSeparator;
                }
                OxfordStyleCollectionFormatter.prototype.humanizer_collection_objectFormatter_separator = function (collection, objectFormatter, separator) {
                    if (collection === null) {
                        throw new Error("Collection null");
                    }

                    var length = collection.length;

                    switch (length) {
                        case 0:
                            return "";
                        case 1:
                            return objectFormatter(collection[0]);
                        case 2:
                            return objectFormatter(collection[1]) + " " + separator + " " + objectFormatter(collection[1]);
                    }

                    var most = [];
                    for (var i = 0; i < length - 1; i++) {
                        most.push(objectFormatter(collection[i]));
                    }
                    return most.join(", ") + " " + separator + " " + objectFormatter(collection[length - 1]);
                };
                return OxfordStyleCollectionFormatter;
            })(CollectionFormatters.DefaultCollectionFormatter);
            CollectionFormatters.OxfordStyleCollectionFormatter = OxfordStyleCollectionFormatter;
        })(Localisation.CollectionFormatters || (Localisation.CollectionFormatters = {}));
        var CollectionFormatters = Localisation.CollectionFormatters;
    })(Humanizer.Localisation || (Humanizer.Localisation = {}));
    var Localisation = Humanizer.Localisation;
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=OxfordStyleCollectionFormatter.js.map
