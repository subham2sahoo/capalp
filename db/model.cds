namespace my.company;
aspect cuid {
  key ID : UUID;
}
entity ProductOrder :cuid{      
    productName: String @sap.aggregation.role:'dimension' @sap.label:'Product'
					@sap.sortable:'true' @sap.filterable:'true';  
    quantity: Integer;    
    price: Integer@sap.aggregation.role:'measure'@sap.label:'Price'
					@sap.sortable:'true' @sap.filterable:'true';
    orderDate: Date;      
    totalAmount: Decimal(10, 2);
}
