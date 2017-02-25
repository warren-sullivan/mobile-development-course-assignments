"use strict";
var InMemoryDataService = (function () {
    function InMemoryDataService() {
    }
    InMemoryDataService.prototype.createDb = function () {
        var assignments = [
            { "id": 1, "assignment": "Quiz", "scored": 16, "possible": 20, "percent": 0.8, "grade": "B" },
            { "id": 2, "assignment": "Quiz", "scored": 18, "possible": 20, "percent": 0.9, "grade": "A" },
            { "id": 3, "assignment": "Quiz", "scored": 17, "possible": 20, "percent": 0.8, "grade": "B" },
            { "id": 4, "assignment": "Test", "scored": 88, "possible": 100, "percent": 0.88, "grade": "B" }
        ];
        return { assignments: assignments };
    };
    return InMemoryDataService;
}());
exports.InMemoryDataService = InMemoryDataService;
//# sourceMappingURL=in-memory-data.service.js.map