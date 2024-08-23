using my.company.ProductOrder as Product from '../db/model';


service companyServ {

    entity ProductOrder as projection  on Product;

}