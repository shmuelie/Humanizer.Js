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
        if (showQuantityAs === void 0) { showQuantityAs = 0 /* None */; }
        var transformedInput = quantity === 1 ? this.singularize(2 /* CouldBeEither */) : this.pluralize(2 /* CouldBeEither */);
        if (showQuantityAs === 0 /* None */) {
            return transformedInput;
        }
        switch (showQuantityAs) {
            case 0 /* None */:
                return transformedInput;
            case 1 /* Numeric */:
                return quantity.toString() + transformedInput;
            case 2 /* Words */:
                return quantity.toWords() + transformedInput;
        }
    };
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=toQuantityExtensions.js.map