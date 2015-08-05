var Humanizer;
(function (Humanizer) {
    var Localisation;
    (function (Localisation) {
        var CollectionFormatters;
        (function (CollectionFormatters) {
            "use strict";
            var DefaultCollectionFormatter = (function () {
                function DefaultCollectionFormatter() {
                    this.defaultSeparator = "";
                }
                DefaultCollectionFormatter.prototype.humanize = function () {
                    var collection = arguments[0];
                    switch (arguments.length) {
                        case 1:
                            return this.humanize_collection(collection);
                        case 2:
                            if (typeof arguments[1] === "string") {
                                return this.humanize_collection_separator(collection, arguments[1]);
                            }
                            return this.humanizer_collection_objectFormatter(collection, arguments[1]);
                        case 3:
                            return this.humanizer_collection_objectFormatter_separator(collection, arguments[1], arguments[2]);
                    }
                };
                DefaultCollectionFormatter.prototype.humanize_collection = function (collection) {
                    return this.humanizer_collection_objectFormatter_separator(collection, function (item) {
                        return item.toString();
                    }, this.defaultSeparator);
                };
                DefaultCollectionFormatter.prototype.humanize_collection_separator = function (collection, separator) {
                    return this.humanizer_collection_objectFormatter_separator(collection, function (item) {
                        return item.toString();
                    }, separator);
                };
                DefaultCollectionFormatter.prototype.humanizer_collection_objectFormatter = function (collection, objectFormatter) {
                    return this.humanizer_collection_objectFormatter_separator(collection, objectFormatter, this.defaultSeparator);
                };
                DefaultCollectionFormatter.prototype.humanizer_collection_objectFormatter_separator = function (collection, objectFormatter, separator) {
                    throw new Error("A collection formatter for the current culture has not been implemented yet.");
                };
                return DefaultCollectionFormatter;
            })();
            CollectionFormatters.DefaultCollectionFormatter = DefaultCollectionFormatter;
        })(CollectionFormatters = Localisation.CollectionFormatters || (Localisation.CollectionFormatters = {}));
    })(Localisation = Humanizer.Localisation || (Humanizer.Localisation = {}));
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=DefaultCollectionFormatter.js.map