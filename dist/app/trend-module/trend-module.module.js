"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var trend_graph_component_1 = require("./trend-graph/trend-graph.component");
var TrendModuleModule = (function () {
    function TrendModuleModule() {
    }
    return TrendModuleModule;
}());
TrendModuleModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [
                    common_1.CommonModule,
                ],
                declarations: [
                    trend_graph_component_1.TrendGraphComponent
                ],
                exports: [
                    trend_graph_component_1.TrendGraphComponent
                ]
            },] },
];
/** @nocollapse */
TrendModuleModule.ctorParameters = function () { return []; };
exports.TrendModuleModule = TrendModuleModule;
//# sourceMappingURL=trend-module.module.js.map