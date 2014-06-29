Humanizer.Js
============

Humanizer meets all your JavaScript needs for manipulating and displaying strings, dates, times, numbers and quantities
This is a port of the popular [Humanizer](http://humanizr.net/) library for JavaScript. For the most part you can just follow the documentation for Humanizer with little to no issue. See below for big differences.


##Notes

1. NumberToTimeSpan really just comverts the given amount of time to the number of milliseconds in that timeframe. This is done since there is no TimeSpan object and milliseconds is the base unit of time in JavaScript. The name has been left for compatability with Humanizer.C#

##Road Map

At this time most of Humanizer has been converted to JavaScript. The only parts that remain are relient on localization, which will be a pain to implement. I might do it but not anytime soon.