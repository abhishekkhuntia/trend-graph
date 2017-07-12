import { Component, ViewChild, Input } from '@angular/core';
import { BaseLineModel } from '../models/baseLine.model';
var TrendGraphComponent = (function () {
    function TrendGraphComponent() {
    }
    TrendGraphComponent.prototype.ngOnChanges = function (changes) {
        this.data = changes.data != undefined ? changes.data.currentValue : this.data;
        this.baseline = changes.baseline != undefined ? changes.baseline.currentValue : this.baseline;
        this.initializing();
    };
    TrendGraphComponent.prototype.initializing = function () {
        this.validateStatus = false;
        this.canvas = this.tgraph.nativeElement;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.max_unit = this.max_abs_value = this.max_value = this.vertical_height_margin = this.data_margin = this.min_value = 0;
        this.baseline = this.baseline != undefined ? new BaseLineModel(this.baseline) : null;
        this.data != undefined ? this.validateGraphInput(this.data) : console.error('GRAPH DATA IS >> UNDEFINED');
        this.gradient = '#484848';
    };
    TrendGraphComponent.prototype.validateGraphInput = function (data) {
        if (data.constructor == Array) {
            this.setDataMargin(data);
            this.getMax(data);
            this.drawGraph(data);
            if (this.baseline != null)
                this.drawBaseline(this.baseline);
        }
        else
            console.error('!!GRAPH DATA NEEDS TO BE ARRAY OF DATASETS!!');
    };
    TrendGraphComponent.prototype.refreshData = function (data) {
        this.data = data;
        this.validateGraphInput(data);
    };
    TrendGraphComponent.prototype.setDataMargin = function (datasets) {
        var maxLength = 0;
        datasets.forEach(function (e) {
            e.data.length > maxLength ? maxLength = e.data.length : maxLength = maxLength;
        });
        this.data_margin = ((this.ctx.canvas.width) / maxLength);
    };
    TrendGraphComponent.prototype.drawGraph = function (data) {
        var _this = this;
        console.log(">> DRAW GRAPH >>");
        //-------SETTING GRAPH PARAMS-----------
        if (this.max_abs_value > 0)
            this.vertical_height_margin = (this.ctx.canvas.height - 20) / (this.max_abs_value);
        else
            this.vertical_height_margin = (this.ctx.canvas.height - 20);
        //--------------------------------------
        var l = 0;
        var t = 0;
        data.forEach(function (d) {
            var baseColor = d['borderColor'];
            d.data.forEach(function (e, i) {
                var s = {};
                s = {
                    left: l,
                    top: _this.calcHeight(e),
                    value: e
                };
                var en = {};
                l += _this.data_margin;
                if ((i + 1) !== d.data.length) {
                    en = {
                        left: l,
                        top: _this.calcHeight(d.data[i + 1]),
                        value: d.data[i + 1]
                    };
                }
                else {
                    en = s;
                    _this.plotCircle(en, baseColor);
                    l = 0;
                }
                if (_this.baseline != null)
                    _this.plotChart(s, en, baseColor, _this.baseline.belowBaseLineColor, d.borderWidth);
                else
                    _this.plotChart(s, en, baseColor, baseColor, d.borderWidth);
            });
        });
    };
    TrendGraphComponent.prototype.plotChart = function (s, en, baseColor, belowColor, borderWidth) {
        // console.log('>> PLOTTING CHART >>');
        var context = this.ctx;
        var gS = 1;
        context.beginPath();
        this.gradient = context.createLinearGradient(0, this.canvas.height, 0, 0);
        if (this.baseline != null) {
            var topPos = this.calcHeight(this.baseline.yValue);
            gS = 1 - (topPos / this.canvas.height);
        }
        try {
            this.gradient.addColorStop("0", belowColor);
            this.gradient.addColorStop(gS, belowColor);
            this.gradient.addColorStop(gS, baseColor);
            this.gradient.addColorStop("1.00", baseColor);
            context.strokeStyle = this.gradient;
            // console.log('ADD COLOR STOP WORKING >',this.gradient);
        }
        catch (e) {
            console.warn('Config Error>, error in processing the values');
            this.gradient = baseColor;
            context.strokeStyle = baseColor;
        }
        context.lineWidth = borderWidth;
        // context.fillText(en['value'],en.left,en.top);
        // console.log('START >',s,'> END >',en);
        context.moveTo(s['left'], s['top']);
        context.lineTo(en['left'], en['top']);
        context.fillStyle = "#f0f0f0";
        context.fill();
        context.stroke();
        // context.closePath();
    };
    TrendGraphComponent.prototype.plotCircle = function (point, color) {
        var c = this.ctx;
        c.beginPath();
        c.moveTo(c.left, c.top);
        c.arc(point.left, point.top, 2.5, 0, Math.PI * 2, true);
        try {
            c.strokeStyle = this.gradient;
        }
        catch (e) {
            c.strokeStyle = color;
        }
        c.fill();
        c.stroke();
        // c.closePath();
    };
    TrendGraphComponent.prototype.getMax = function (v) {
        var _this = this;
        var mT; // considering there is no negative value in the data
        var mnT;
        mT = this.max_value = v[0].data[0];
        mnT = this.min_value = v[0].data[0];
        v.forEach(function (d) {
            mnT = _this.min_value;
            mT = _this.max_value;
            d.data.forEach(function (i) {
                mT = i > mT ? i : mT;
                mnT = i < mnT ? i : mnT;
            });
            _this.min_value = mnT;
            _this.max_value = mT;
        });
        if (mnT < 0 && mT > 0) {
            this.max_abs_value = mT + Math.abs(mnT);
        }
        else if (mT < 0)
            this.max_abs_value = Math.abs(mnT);
        else if (mT == 0)
            this.max_abs_value = Math.abs(mnT);
        else if (mT >= 0 && mnT >= 0)
            this.max_abs_value = mT;
        this.min_value = mnT;
        this.max_value = mT;
        // console.log('MAX ABS VALUE >', this.max_abs_value,' > MAX DATA VALUE > ', this.max_value, ' > MIN DATA VALUE >',this.min_value);
    };
    TrendGraphComponent.prototype.calcHeight = function (v) {
        if (this.max_abs_value > 0) {
            if (this.max_value <= 0 && this.min_value >= 0) {
                var relattr = this.max_value <= 0 ? this.max_value : this.min_value;
                return Math.floor(this.vertical_height_margin * (relattr - v + 5));
            }
            else
                return Math.floor(this.vertical_height_margin * (this.max_value - v + 5));
        }
        else
            return Math.floor(this.vertical_height_margin);
    };
    TrendGraphComponent.prototype.drawBaseline = function (baseLine) {
        // console.log('DRAW-BASELINE >>', baseLine);
        this.drawHorizontalLine(baseLine.yValue, baseLine.borderColor, baseLine.borderWidth);
    };
    TrendGraphComponent.prototype.drawHorizontalLine = function (yValue, color, lineWidth) {
        yValue = this.calcHeight(yValue);
        this.ctx.beginPath();
        this.ctx.moveTo(0, yValue);
        this.ctx.lineTo(this.canvas.width, yValue);
        this.ctx.lineWidth = lineWidth;
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
    };
    return TrendGraphComponent;
}());
export { TrendGraphComponent };
TrendGraphComponent.decorators = [
    { type: Component, args: [{
                selector: 'trend-graph',
                template: '<canvas #tgraph class="gclass"></canvas>',
                styles: ["\n    .gclass{}\n  "],
            },] },
];
/** @nocollapse */
TrendGraphComponent.ctorParameters = function () { return []; };
TrendGraphComponent.propDecorators = {
    'tgraph': [{ type: ViewChild, args: ['tgraph',] },],
    'data': [{ type: Input },],
    'baseline': [{ type: Input },],
};
//# sourceMappingURL=trend-graph.component.js.map