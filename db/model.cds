namespace my.company;

aspect cuid {
  key ID : UUID;
}

entity ProductOrder : cuid {
  productName : String;
  quantity    : Integer;
  price       : Integer;
  orderDate   : Date;
  totalAmount : Decimal(10, 2);
}

entity Employees {
  key EmployeeID : String(10);
      ManagerID  : Association to Employees;
      Name       : String(100);
      Position   : String(50);
      Department : String(50);
      LEVEL      : Integer;
      DrillState : String(10);
      // MAGNITUDE:Integer @sap.hierarchy.node.descendant.count.for: 'EmployeeID';
      children   : Composition of many Employees
                     on children.ManagerID = $self;
}

entity VariantManagement {
 key sKey      : String(50);
  Name      : String(50);
  default   : Boolean;
 key FieldName : String(50);
key  Value     : String(50);
}
