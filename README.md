# daze

*Module to manage simple 8-digit integer dates.*

[![Dependency Status](https://david-dm.org/metaceo/nodejs.daze.svg)](https://david-dm.org/metaceo/nodejs.daze)

```
npm install daze
```

## Usage

* **To Date** - Get a standard Javascript `Date` object.
* **To Daze** - Get an 8-digit integer to save/JSON/compare with.
* **Is Late** - Determine if `dateA` has occurred since `dateB`.
* **Is Greater** - Compare two dates to find if `dateA` comes after `dateB`.
* **Is Lesser** - Compare two dates to find if `dateA` comes before `dateB`.
* **Days Past** - Get a whole integer representing the amount of days from `dateA` since `dateB` (can be negative - will still be whole.)
* **Days Until** - Get a whole integer representing the amount of days from `dateA` to `dateB` (can be negative - will still be whole.)

String date formats may conflict with your processing time zone. If you receive a formatted date string, from something like `Date.toISOString`, from a source in another time zone then you'll encounter a conflict when `daze`'ing. Try sharing `daze`'ed values or, instead, `daze` formatted string values from sources with expected time zones. Maybe this can be a to-do?.. maybe regex/parse values out of strings of known standards?

*All examples below assume April 3rd, 2016 - the day of this writing - if not otherwise specified.*

**Using Two Dates**

Both `dateA` and `dateB` can be different date types - those types are shown in examples further below.

```javascript
var dateA = 20160401;
var dateB = 20160501;

daze(dateA).toDaze();
daze(dateA).toDate();
daze(dateA).late(dateB);
daze(dateA).past(dateB);
daze(dateA).until(dateB);
daze(dateA).greater(dateB);
daze(dateA).lesser(dateB);
```

**Using No Dates**

When you do not provide a date, today - or `daze().toDaze()` - is assumed.

```javascript
daze().toDaze(); // 20160403

daze(20160403).toDaze() === daze().toDaze();
```

**Using Different Date Types**

All the below would return `20160403`.

```javascript
daze().toDaze();
daze(20160403).toDaze();
daze(new Date).toDaze();
daze(1459730291984).toDaze();
```

### Programmatically

**Standard Usage Examples**

```javascript
var daze = require("daze");

/* As of this writing, this month - April - has
// 30 days. The below examples illustrate some
// general usage with real results.
*/
console.log(daze); // "[Function: daze]"

console.log(daze().toDaze()); // 20160403
console.log(daze().toDate()); // Sun Apr 03 2016 19:09:49 GMT-0500 (CDT)

console.log(daze().late(20160402)); // true
console.log(daze().late(20160403)); // true
console.log(daze().late(20160404)); // false

console.log(daze().past(20160401)); // 2
console.log(daze().past(20160403)); // 0
console.log(daze().past(20160430)); // -27

console.log(daze().until(20160401)); // -2
console.log(daze().until(20160403)); // 0
console.log(daze().until(20160430)); // 27

console.log(daze(20160101).greater(20150101)); // true
console.log(daze(20160101).lesser(20170101)); // true
```

### Within The Browser

**Standard Usage Examples**

```html
<script type="text/javascript" src="daze.min.js"></script>

<script>
  
  console.log(Date.daze); // "function daze()"
  
  console.log(Date.daze().toDaze()); // 20160403
  
  /* ...everything else is just as accessible
  // like the programmatic examples above.
  */
</script>
```
