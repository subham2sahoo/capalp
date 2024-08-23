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
        }
    });
});
