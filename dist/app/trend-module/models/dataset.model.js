"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DataSetModel = (function () {
    function DataSetModel(input) {
        this.data = input.data ? input.data : [];
        this.borderColor = input.borderColor ? input.borderColor : '#66ccff';
        this.borderWidth = input.borderWidth ? input.borderWidth : '1';
    }
    return DataSetModel;
}());
exports.DataSetModel = DataSetModel;
//# sourceMappingURL=dataset.model.js.map