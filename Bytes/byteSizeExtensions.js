var Humanizer;
(function (Humanizer) {
    "use strict";
    /**
     * Considers input as bits
     */
    Number.prototype.bits = function () {
        /// <summary>
        ///     Considers input as bits
        /// </summary>
        return Humanizer.Bytes.ByteSize.fromBits(this);
    };
    /**
     * Considers input as bytes
     */
    Number.prototype.bytes = function () {
        /// <summary>
        ///     Considers input as bytes
        /// </summary>
        return Humanizer.Bytes.ByteSize.fromBytes(this);
    };
    /**
     * Considers input as kilobytes
     */
    Number.prototype.kilobytes = function () {
        /// <summary>
        ///     Considers input as kilobytes
        /// </summary>
        return Humanizer.Bytes.ByteSize.fromKilobytes(this);
    };
    /**
     * Considers input as megabytes
     */
    Number.prototype.megabytes = function () {
        /// <summary>
        ///     Considers input as megabytes
        /// </summary>
        return Humanizer.Bytes.ByteSize.fromMegabytes(this);
    };
    /**
     * Considers input as gigabytes
     */
    Number.prototype.gigabytes = function () {
        /// <summary>
        ///     Considers input as gigabytes
        /// </summary>
        return Humanizer.Bytes.ByteSize.fromGigabytes(this);
    };
    /**
     * Considers input as terabytes
     */
    Number.prototype.terabytes = function () {
        /// <summary>
        ///     Considers input as terabytes
        /// </summary>
        return Humanizer.Bytes.ByteSize.fromTerabyte(this);
    };
})(Humanizer || (Humanizer = {}));
//# sourceMappingURL=byteSizeExtensions.js.map