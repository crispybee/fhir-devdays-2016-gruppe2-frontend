"use strict";
var DateToAge = (function () {
    function DateToAge(inputDate) {
        this.inputDate = inputDate;
        var splitDate = inputDate.split('-');
        this.year = splitDate[0];
        this.month = splitDate[1];
        this.day = splitDate[2];
    }
    DateToAge.prototype.getAge = function () {
        // calculate the milliseconds since birth date (ms since 1970 to today minus ms between 1970 and birth date)
        var dateMilliseconds = Date.now() - new Date(parseInt(this.year), parseInt(this.month), parseInt(this.day)).getTime();
        // remove numbers after floating point
        var age = Math.trunc(dateMilliseconds / 31536000000);
        return age;
    };
    DateToAge.prototype.getReadableDate = function () {
        return this.day + '.' + this.month + '.' + this.year;
    };
    DateToAge.prototype.getReadableDateUS = function () {
        return this.month + '.' + this.day + '.' + this.year;
    };
    return DateToAge;
}());
exports.DateToAge = DateToAge;
//# sourceMappingURL=dateAgeCalculator.js.map