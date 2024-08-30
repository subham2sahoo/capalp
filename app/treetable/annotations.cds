using companyServ as service from '../../srv/model_srv';
annotate service.Employees with @(
  UI                                             : {
    SelectionFields: [
      EmployeeID ,
      Name
    ],
    LineItem       : [
      {
        $Type: 'UI.DataField',
        Value: EmployeeID,
      },
      {$Type: 'UI.DataField',Value: Name},
      {$Type: 'UI.DataField',Value: Position}
    ]
  }
);
annotate service.Employees {

   EmployeeID @Common.ValueList: {
    CollectionPath : 'Employees',
    Label : '',
    Parameters : [
    {$Type: 'Common.ValueListParameterInOut', LocalDataProperty: EmployeeID, ValueListProperty: 'EmployeeID'}
    ]
  };
}
annotate service.Employees {
  Name @Common.ValueList: {
    CollectionPath : 'Employees',
    Label : '',
    Parameters : [
    {$Type: 'Common.ValueListParameterInOut', LocalDataProperty: Name, ValueListProperty: 'Name'}
    ]
  };
}