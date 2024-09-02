const cds = require("@sap/cds");
const { VariantManagement } = cds.entities('companyServ');
module.exports = (srv) => {
  srv.on("saveVariant", async (req, res) => {
    const flag = req.data.flag;
    if (flag === "create") {
      const items = JSON.parse(req.data.items);
      if (items[0].default)
        await UPDATE`MY_COMPANY_VARIANTMANAGEMENT`.set`default =false`.where`default=true`;
      items.forEach(async item => {
        const ID = `${item.key}_${item.key}`;
        item.ID = ID
        await INSERT(item).into(VariantManagement);
      })
    }
    if (flag === "updateVariant") {
      const items = JSON.parse(req.data.items);
      await DELETE.from(VariantManagement).where({ sKey: { '=': items[0].sKey } });
      items.forEach(async item => {
        await INSERT(item).into(VariantManagement);
      })

    }
    if (flag === "delete") {
      const keys = JSON.parse(req.data.items);
      keys.forEach(async key => {
        await DELETE.from(VariantManagement).where({ sKey: { '=': key } });
      })
    }
    if (flag === "updateDefault") {
      const key = JSON.parse(req.data.items);
      await UPDATE`MY_COMPANY_VARIANTMANAGEMENT`.set`default =false`.where`default=true`;
      await UPDATE`MY_COMPANY_VARIANTMANAGEMENT`.set`default =true`.where`sKey=${key}`;
    }
    if (flag === "rename") {
      const renamed = JSON.parse(req.data.items);
      renamed.forEach(async obj => {
        await UPDATE`MY_COMPANY_VARIANTMANAGEMENT`.set`name =${obj.name}`.where`sKey=${obj.key}`;
      })
    }
  })
}