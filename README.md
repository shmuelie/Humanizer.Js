Humanizer.Js
============

Humanizer meets all your JavaScript needs for manipulating and displaying strings, dates, times, numbers and quantities

##Implemented
The following classes have been implemented:

* OnNoMatch
* OrdinalizeExtensions
* LetterCasing
* ToTitleCase
* ToLowerCase
* ToUpperCase
* ToSentenceCase
* To
* Casing Extensions
* StringHumanizerExtensions
* InflectorExtentions
* NumberToWordsExtension
* NumberToOrdinalWordsExtension
* NumberToTimeSpanExtensions
* RomanNumeralExtensions

##Notes

1. NumberToTimeSpan really just comverts the given amount of time to the number of milliseconds in that timeframe. This is done since there is no TimeSpan object and milliseconds is the base unit of time in JavaScript. The name has been left for compatability with Humanizer.C#
