using my.company as my from '../db/model';


service companyServ {

    @sap.semantics: 'aggregate'
    entity ProductOrder as projection  on my.ProductOrder;
    entity Employees as projection  on my.Employees;

}