sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter"
],
    function (Controller) {
        "use strict";
        let that;
        return Controller.extend("alp.controller.alp", {
            onInit: function () {
                that = this;
                const oModel = that.getOwnerComponent().getModel();
                that.getView().setModel(oModel);
                // that.filterChart = false;

            },
            handleChartSelection: function (oEvent) {
                const filters = [],
                    table = that.byId("LineItemsSmartTable").getTable();
                if (oEvent.sId == 'selectData') {
                    that.byId("idChart").getSelectedDataPoints().dataPoints.forEach(item => {
                        const obj = item.context.getObject(),
                            productName = obj.productName,
                            price = obj.price,
                            filter = new sap.ui.model.Filter(
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
                const filters = [],
                    table = that.byId("LineItemsSmartTable").getTable();
                if (that.byId("idChart").getSelectedDataPoints().count === 0) {
                    table.getBinding().filter([]);
                } else {
                    that.byId("idChart").getSelectedDataPoints().dataPoints.forEach(item => {
                        const obj = item.context.getObject(),
                            productName = obj.productName,
                            price = obj.price,
                            filter = new sap.ui.model.Filter(
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
            onSelectDate: async function (oEvent) {
                // that.filterChart = true;
                const from = that.byId("idSelectDate").getFrom(),
                    to = that.byId("idSelectDate").getTo(),
                    filter =
                        new sap.ui.model.Filter(
                            "orderDate",
                            sap.ui.model.FilterOperator.BT,
                            from, to
                        ),
                    table = that.byId("LineItemsSmartTable").getTable(),
                    chart = await that.byId("smartChartGeneral").getChartAsync();
                table.getBinding().filter(filter);
                chart.getBinding('data').filter(filter);
            },
            onClear: function (oEvent) {
                that.byId("idSelectDate").setValue();
                that.byId("LineItemsSmartTable").getTable().getBinding().filter([]);
                that.byId("idChart").getBinding('data').filter([])
            },
            beforeRebindChart: function (oEvent) {
                // if (!that.filterChart) return;
                const from = that.byId("idSelectDate").getFrom(),
                    to = that.byId("idSelectDate").getTo();
                    if(from && to){
                 const   oFilter =
                        new sap.ui.model.Filter(
                            "orderDate",
                            sap.ui.model.FilterOperator.BT,
                            from, to
                        ),
                    oBindingParams = oEvent.getParameter('bindingParams');
                oBindingParams.filters.push(oFilter);
                    }
                // that.filterChart = false;
            },
        });
    });
