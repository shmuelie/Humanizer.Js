var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Humanizer;
(function (Humanizer) {
    var Configuration;
    (function (Configuration) {
        var CollectionFormatterRegistry = (function (_super) {
            __extends(CollectionFormatterRegistry, _super);
            function CollectionFormatterRegistry() {
                _super.call(this, new Humanizer.Localisation.CollectionFormatters.DefaultCollectionFormatter());
                this.register("en", new Humanizer.Localisation.CollectionFormatters.OxfordStyleCollectionFormatter());
            }
            return CollectionFormatterRegistry;
        })(Configuration.LocaliserRegistry);
        Configuration.CollectionFormatterRegistry = CollectionFormatterRegistry;
    })(Configuration = Humanizer.Configuration || (Humanizer.Configuration = {}));
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=CollectionFormatterRegistry.js.map