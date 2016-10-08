"use strict";
var Entry = (function () {
    function Entry(description) {
        this.description = description;
    }
    return Entry;
}());
exports.Entry = Entry;
var SidebarSearchFilter = (function () {
    function SidebarSearchFilter() {
    }
    SidebarSearchFilter.prototype.getMatchedNamesInArray = function (inputArray, substring) {
        var listOfMatchedNames = [];
        var pattern = new RegExp('\\b' + substring, 'i');
        inputArray.forEach(function (entry) {
            var contains = pattern.test(entry.description);
            if (contains === true) {
                listOfMatchedNames.push(new Entry(entry.description));
            }
        });
        return listOfMatchedNames;
    };
    return SidebarSearchFilter;
}());
exports.SidebarSearchFilter = SidebarSearchFilter;
//# sourceMappingURL=sidebarSearchFilter.service.js.map