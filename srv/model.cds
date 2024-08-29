using my.company as my from '../db/model';


service companyServ {

    entity ProductOrder as projection on my.ProductOrder;
    entity Employees    as projection on my.Employees;

}
