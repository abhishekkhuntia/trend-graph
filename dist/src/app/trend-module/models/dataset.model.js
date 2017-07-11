var DataSetModel = (function () {
    function DataSetModel(input) {
        this.data = input.data ? input.data : [];
        this.borderColor = input.borderColor ? input.borderColor : '#66ccff';
        this.borderWidth = input.borderWidth ? input.borderWidth : '1';
    }
    return DataSetModel;
}());
export { DataSetModel };
//# sourceMappingURL=dataset.model.js.map