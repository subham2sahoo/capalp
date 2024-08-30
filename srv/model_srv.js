const cds = require("@sap/cds");
const { VariantManagement } = cds.entities('companyServ');
module.exports = (srv) => {
  srv.on("saveVariant", async (req, res) => {
    const flag = req.data.flag;
    if (flag === "create") {
      const items = JSON.parse(req.data.items);
      
      items.forEach(async item => {
        const ID = `${item.key}_${item.key}`;
        item.ID= ID
        await INSERT(item).into(VariantManagement);
      })
    }
    if (flag === "delete") {
      const keys = JSON.parse(req.data.items);
      keys.forEach(async key => {
       await DELETE.from(VariantManagement).where({ sKey: { '=': key } });
      })
    }
  })
}