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
entity Employees{
    key EmployeeID : String(10)               @sap.hierarchy.node.for       : 'EmployeeID';
        ManagerID  : Association to Employees @sap.hierarchy.parent.node.for: 'EmployeeID';
        Name       : String(100);
        Position   : String(50);
        Department : String(50);
        LEVEL      : Integer                  @sap.hierarchy.level.for      : 'EmployeeID';
        DrillState : String(10)               @sap.hierarchy.drill.state.for: 'EmployeeID';
        // MAGNITUDE:Integer @sap.hierarchy.node.descendant.count.for: 'EmployeeID';
        children   : Composition of many Employees
                         on children.ManagerID = $self;
}

