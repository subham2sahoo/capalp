sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";
let that;
    return Controller.extend("treetable.controller.View1", {
        onInit: function () {
            that = this;
            const oModel = that.getOwnerComponent().getModel('oModel');
            that.getView().setModel(oModel);

        }
    });
});
