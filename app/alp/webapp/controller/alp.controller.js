sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    function (Controller) {
        "use strict";
        let that;
        return Controller.extend("alp.controller.alp", {
            onInit: function () {
                that = this;
                const oModel = that.getOwnerComponent().getModel();
                that.getView().setModel(oModel);
            },
            handleChartSelection: function (oEvent) {
                var filters = [];
                const table = that.byId("LineItemsSmartTable").getTable();
                if (oEvent.sId == 'selectData') {
                    that.byId("idChart").getSelectedDataPoints().dataPoints.forEach(item => {
                        const obj = item.context.getObject()
                        const productName = obj.productName;
                        const price = obj.price;
                        var filter = new sap.ui.model.Filter(
                            [
                                new sap.ui.model.Filter(
                                    "productName",
                                    sap.ui.model.FilterOperator.Contains,
                                    productName
                                ),
                                new sap.ui.model.Filter(
                                    "price",
                                    sap.ui.model.FilterOperator.EQ,
                                    parseInt(price, 10)
                                ),
                            ],
                            true
                        );
                        filters.push(filter)
                    })

                    table.getBinding().filter(new sap.ui.model.Filter(filters, false));
                } else {
                    table.getBinding().filter([]);
                }
            },
            handleChartdeSelection: function (oEvent) {
                var filters = [];
                const table = that.byId("LineItemsSmartTable").getTable();
                if (that.byId("idChart").getSelectedDataPoints().count === 0) {
                    table.getBinding().filter([]);
                } else {
                    that.byId("idChart").getSelectedDataPoints().dataPoints.forEach(item => {
                        const obj = item.context.getObject()
                        const productName = obj.productName;
                        const price = obj.price;
                        var filter = new sap.ui.model.Filter(
                            [
                                new sap.ui.model.Filter(
                                    "productName",
                                    sap.ui.model.FilterOperator.Contains,
                                    productName
                                ),
                                new sap.ui.model.Filter(
                                    "price",
                                    sap.ui.model.FilterOperator.EQ,
                                    parseInt(price, 10)
                                ),
                            ],
                            true
                        );
                        filters.push(filter)
                    })
                    table.getBinding().filter(new sap.ui.model.Filter(filters, false));
                }
            },
            onSelectDate:function(oEvent){
                const from = that.byId("idSelectDate").getFrom(),
                to = that.byId("idSelectDate").getTo(),
                 filter = new sap.ui.model.Filter(
                    [
                        new sap.ui.model.Filter(
                            "orderDate",
                            sap.ui.model.FilterOperator.GE,
                            from
                        ),
                        new sap.ui.model.Filter(
                            "orderDate",
                            sap.ui.model.FilterOperator.LE,
                            to
                        ),
                    ],
                    true
                ),
                table = that.byId("LineItemsSmartTable").getTable();
                table.getBinding().filter(filter);

            },
            onClear:function(oEvent){
                that.byId("idSelectDate").setValue();
                that.byId("LineItemsSmartTable").getTable().getBinding().filter([]);
            }
        });
    });
