"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseLineModel = (function () {
    function BaseLineModel(input) {
        console.log('BASELINE CONSTRUCTOR >>', input);
        this.yValue = input.yValue ? input.yValue : '0';
        this.borderColor = input.borderColor ? input.borderColor : '#ddd';
        this.borderWidth = input.borderWidth ? input.borderWidth : '1';
        this.belowBaseLineColor = input.belowBaseLineColor ? input.belowBaseLineColor : 'red';
    }
    return BaseLineModel;
}());
exports.BaseLineModel = BaseLineModel;
//# sourceMappingURL=baseLine.model.js.map