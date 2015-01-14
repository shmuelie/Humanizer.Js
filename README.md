Humanizer.Js
============

Humanizer meets all your JavaScript needs for manipulating and displaying 
strings, dates, times, numbers and quantities. This is a port of the popular 
[Humanizer](https://github.com/MehdiK/Humanizer) library to JavaScript. For the 
most part you can just follow the documentation for Humanizer with little to no 
issue. See below for big differences.


##Differences From Humanizer

1. Name casing has been changed for JavaScript so all functions and properties 
   start with lower case now, so instead of 
   `"Sentence casing".Transform(To.LowerCase)` you use 
   `"Sentence casing".transform(Humanizer.To.LowerCase)`.
2. There isn't a TimeSpan equivalent in JavaScript so all action from or to 
   TimeSpans now use Numbers in milliseconds instead. So instead of 
   `TimeSpan.FromDays(16).Humanize()` you use `(16).days().time()`. Both will 
   return "2 weeks".
3. I am sadly behind the changes to Humanizer so at times what I have will be 
   the old way of doing something so you might have to look at older version of 
   the documentation to understand things.

##Road Map

I have two primary tasks currently with Humanizer.Js

1. Implement features not implemented that are in Humanizer.
2. Update Implemented features to match updates to Humanizer.

Currently it's just me working on this while I wait for code to compile at work. 
As such I'm only going so fast. I'm currently focusing on number 2 so that the 
documentation from Humanizer can be used. To save myself time I currently am 
only implementing default and/or English for code that is localisable. The 
ablity to add other languages is there, but for the sake of getting more of the 
API done I'm only doing this.