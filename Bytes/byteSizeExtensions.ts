interface Number
{
    bits(): Humanizer.Bytes.ByteSize;
    bytes(): Humanizer.Bytes.ByteSize;
    kilobytes(): Humanizer.Bytes.ByteSize;
    megabytes(): Humanizer.Bytes.ByteSize;
    gigabytes(): Humanizer.Bytes.ByteSize;
    terabytes(): Humanizer.Bytes.ByteSize;
}

module Humanizer
{
    "use strict";

    /**
     * Considers input as bits
     */
    Number.prototype.bits = function (): Bytes.ByteSize
    {
        /// <summary>
        ///     Considers input as bits
        /// </summary>

        return Bytes.ByteSize.fromBits(this);
    };

    /**
     * Considers input as bytes
     */
    Number.prototype.bytes = function (): Bytes.ByteSize
    {
        /// <summary>
        ///     Considers input as bytes
        /// </summary>

        return Bytes.ByteSize.fromBytes(this);
    };

    /**
     * Considers input as kilobytes
     */
    Number.prototype.kilobytes = function (): Bytes.ByteSize
    {
        /// <summary>
        ///     Considers input as kilobytes
        /// </summary>

        return Bytes.ByteSize.fromKilobytes(this);
    };

    /**
     * Considers input as megabytes
     */
    Number.prototype.megabytes = function (): Bytes.ByteSize
    {
        /// <summary>
        ///     Considers input as megabytes
        /// </summary>

        return Bytes.ByteSize.fromMegabytes(this);
    };

    /**
     * Considers input as gigabytes
     */
    Number.prototype.gigabytes = function (): Bytes.ByteSize
    {
        /// <summary>
        ///     Considers input as gigabytes
        /// </summary>

        return Bytes.ByteSize.fromGigabytes(this);
    };

    /**
     * Considers input as terabytes
     */
    Number.prototype.terabytes = function (): Bytes.ByteSize
    {
        /// <summary>
        ///     Considers input as terabytes
        /// </summary>

        return Bytes.ByteSize.fromTerabyte(this);
    };
}