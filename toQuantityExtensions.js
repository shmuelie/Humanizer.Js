var Humanizer;
(function (Humanizer) {
    "use strict";
    (function (ShowQuantityAs) {
        ShowQuantityAs[ShowQuantityAs["None"] = 0] = "None";
        ShowQuantityAs[ShowQuantityAs["Numeric"] = 1] = "Numeric";
        ShowQuantityAs[ShowQuantityAs["Words"] = 2] = "Words";
    })(Humanizer.ShowQuantityAs || (Humanizer.ShowQuantityAs = {}));
    var ShowQuantityAs = Humanizer.ShowQuantityAs;
    String.prototype.toQuantity = function (quantity, showQuantityAs) {
        if (showQuantityAs === void 0) { showQuantityAs = ShowQuantityAs.None; }
        var transformedInput = quantity === 1 ? this.singularize(false) : this.pluralize(false);
        if (showQuantityAs === ShowQuantityAs.None) {
            return transformedInput;
        }
        switch (showQuantityAs) {
            case ShowQuantityAs.None:
                return transformedInput;
            case ShowQuantityAs.Numeric:
                return quantity.toString() + transformedInput;
            case ShowQuantityAs.Words:
                return quantity.toWords() + transformedInput;
        }
    };
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=toQuantityExtensions.js.map