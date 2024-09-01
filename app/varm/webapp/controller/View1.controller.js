sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/VariantItem",
    'sap/m/library'
],
    function (Controller, VariantItem, mLibrary) {
        "use strict";

        let that;
        var SharingMode = mLibrary.SharingMode;
        return Controller.extend("varm.controller.View1", {
            onInit: function () {
                that = this;
                that.oFilterBar = that.byId("filterbar");
                that._oVM = that.byId("vm");
                that.varianStore = [];
                that.oModel = that.getOwnerComponent().getModel("oModel");
                that.oModel.read("/ProductOrder", {
                    success: function (oRes) {
                        that.byId("idTable").setModel(new sap.ui.model.json.JSONModel({
                            items: oRes.results
                        }));
                        that.byId("filterbar").setModel(new sap.ui.model.json.JSONModel({
                            items: oRes.results
                        }));
                    },
                    error: function (oError) {
                        console.error(oError);
                    }
                })
                that.fetchVariant();
            },
            fetchVariant: function () {
                that.oModel.read("/VariantManagement", {
                    success: function (oRes) {
                        that.variantData = oRes.results;
                        const uniqueKeys = new Set();
                        const filteredArray = oRes.results.filter(item => {
                            if (!uniqueKeys.has(item.sKey)) {
                                uniqueKeys.add(item.sKey);
                                return true;
                            }
                            return false;
                        });
                        filteredArray.forEach(obj => {
                            const oItem = new VariantItem({
                                key: obj.sKey,
                                title: obj.Name,
                                remove: true
                            });
                            that._oVM.addItem(oItem);
                        })
                        that.onSelect()
                    },
                    error: function (oError) {
                        console.error(oError);
                    }
                })
            },
            onSelect: function (event) {
                let key, params, item;
                if (!event) {
                    item = that.variantData.filter(o => o.default === true);
                    that._oVM.setSelectedKey(item[0].sKey);
                } else {
                    params = event.mParameters;
                    key = params.key;
                    item = that.variantData.filter(o => o.sKey === key);
                }

                that.filterData = that.makeFiterData(item);
                // // var sMessage = "Selected Key: " + params.key;
                // const filters = that.varianStore.find(o => o.key === params.key).filter;
                that.oFilterBar.getAllFilterItems().forEach((oFilterItem) => {
                    oFilterItem.getControl().setSelectedKeys();
                    oFilterItem.getControl().setSelectedKeys(that.filterData[oFilterItem.getControl().getName()]);
                });
            },
            onSave: function (event) {
                var params = event.getParameters();
                if (params.overwrite) {
                    var oItem = this._oVM.getItemByKey(params.key);
                    that._oVM = this.getView().byId("vm");
                    this._showMessagesMessage("View '" + oItem.getTitle() + "' updated.");
                } else {
                    var aData = this.oFilterBar.getAllFilterItems().reduce(function (aResult, oFilterItem) {
                        aResult.push({
                            groupName: oFilterItem.getGroupName(),
                            fieldName: oFilterItem.getName(),
                            fieldData: oFilterItem.getControl().getSelectedKeys()
                        });

                        return aResult;
                    }, []);
                    params.filters = aData;
                    this._createNewItem(params);
                }

                this._oVM.setModified(false);
            },
            onManage: function (event) {
                var params = event.getParameters();
                this._updateItems(params);
                if(params.deleted)
                that.deleteVariant(params.deleted);
            if(params.def){
                that.oModel.callFunction("/saveVariant", {
                    method: "GET",
                    urlParameters: { items: JSON.stringify(params.def), flag: "updateDefault" },
                    success: function (oRes) {
                        console.log(oRes)
                    },
                    error: function (error) {
                        console.log(error)
                    }
                })

            }
            },
            _updateItems: function (mParams) {
                if (mParams.deleted) {
                    mParams.deleted.forEach(function (sKey) {
                        var oItem = this._oVM.getItemByKey(sKey);``
                        if (oItem) {
                            this._oVM.removeItem(oItem);
                            oItem.destroy();
                        }
                    }.bind(this));
                }

                if (mParams.hasOwnProperty("def")) {
                    this._oVM.setDefaultKey(mParams.def);
                }

                this._checkCurrentVariant();
            },
            _checkCurrentVariant: function () {
                var sSelectedKey = this._oVM.getSelectedKey();
                var oItem = this._oVM.getItemByKey(sSelectedKey);
                if (!oItem) {
                    var sKey = this._oVM.getStandardVariantKey();
                    if (sKey) {
                        this._oVM.setSelectedKey(sKey);
                    }
                }
            },
            _createNewItem: function (mParams) {
                var sKey = "key_" + Date.now();

                var oItem = new VariantItem({
                    key: sKey,
                    title: mParams.name,
                    executeOnSelect: true,
                    author: "sample",
                    changeable: true,
                    remove: true
                });
                that.varianStore.push({
                    key: sKey,
                    filter: mParams.filters,
                    title: mParams.name,
                    def: mParams.def
                })
                that.saveVarOnDb({
                    sKey: sKey,
                    filter: mParams.filters,
                    Name: mParams.name,
                    default: mParams.def
                })

                if (mParams.hasOwnProperty("public") && mParams.public) {
                    oItem.setSharing(SharingMode.Public);
                }
                if (mParams.def) {
                    that._oVM.setDefaultKey(sKey);
                }

                that._oVM.addItem(oItem);

                // this._showMessagesMessage("New view '" + oItem.getTitle() + "' created with key:'" + sKey + "'.");
            },
            onPress: function (event) {
                debugger
                this._oVM.setModified(!this._oVM.getModified());
            },
            saveVarOnDb: function (item) {
                const variant = [];
                item.filter.forEach(i => {
                    i.fieldData.forEach(o => {
                        variant.push({ sKey: item.sKey, Name: item.Name, default: item.default, FieldName: i.fieldName, Value: o })
                    })
                });
                that.variantData.push(...variant);
                that.oModel.callFunction("/saveVariant", {
                    method: "GET",
                    urlParameters: { items: JSON.stringify(variant), flag: "create" },
                    success: function (oRes) {
                        console.log(oRes);
                    },
                    error: function (error) {
                        console.log(error)
                    }
                })
            },
            deleteVariant: function (keys) {
                that.oModel.callFunction("/saveVariant", {
                    method: "GET",
                    urlParameters: { items: JSON.stringify(keys), flag: "delete" },
                    success: function (oRes) {
                        console.log(oRes)
                    },
                    error: function (error) {
                        console.log(error)
                    }
                })
            },
            makeFiterData: function (item) {
                const res = {};
                const allField = [...new Set(item.map(o => o.FieldName))];
                allField.forEach(field => {
                    res[field] = [...new Set(item.filter(i => i.FieldName === field).map(o => o.Value))]
                })
                return res;
            },
            onFilterChange:function(oEvent){
                debugger
            }
        });
    });
