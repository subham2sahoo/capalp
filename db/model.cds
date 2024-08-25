namespace my.company;
aspect cuid {
  key ID : UUID;
}
entity ProductOrder :cuid{      
    productName: String @sap.aggregation.role:'dimension';  
    quantity: Integer;    
    price: Integer@sap.aggregation.role:'measure';
    orderDate: Date;      
    totalAmount: Decimal(10, 2);
}
