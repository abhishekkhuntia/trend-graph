import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrendGraphComponent } from './trend-graph/trend-graph.component';
var TrendGraphModule = (function () {
    function TrendGraphModule() {
    }
    return TrendGraphModule;
}());
export { TrendGraphModule };
TrendGraphModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                ],
                declarations: [
                    TrendGraphComponent
                ],
                exports: [
                    TrendGraphComponent
                ]
            },] },
];
/** @nocollapse */
TrendGraphModule.ctorParameters = function () { return []; };
//# sourceMappingURL=trend-graph.module.js.map