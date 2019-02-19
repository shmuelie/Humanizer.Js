//#region ArrayFixes

if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (item) {
        var length = this.length;
        for (var i = 0; i < length; i++) {
            if (item === this[i]) {
                return i;
            }
        }
        return -1;
    };
}

//#endregion

//#region StringFixes

if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, "");
    };
}

//#endregion