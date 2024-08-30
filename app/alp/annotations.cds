using companyServ as service from '../../srv/model_srv';

annotate service.ProductOrder with @(UI: {
  LineItem        : [
    {
      $Type: 'UI.DataField',
      Value: productName,
      Label: 'Product Name'
    },
    {
      $Type: 'UI.DataField',
      Value: price,
      Label: 'Price'
    },
    {
      $Type: 'UI.DataField',
      Value: orderDate,
      Label: 'Order Date'
    },
    {
      $Type: 'UI.DataField',
      Value: quantity,
      Label: 'Quantity'
    },
    {
      $Type: 'UI.DataField',
      Value: totalAmount,
      Label: 'Total Amount'
    }
  ],
  SelectionFields : [
    productName,
    orderDate
  ],
  DataPoint #price: {
    $Type: 'UI.DataPointType',
    Value: price
  },

  Chart           : {
    $Type              : 'UI.ChartDefinitionType',
    Title              : 'Product Price',
    Description        : 'Price',
    ChartType          : #Column,
    Measures           : [price],
    MeasureAttributes  : [{
      $Type           : 'UI.ChartMeasureAttributeType',
      Measure         : price,
      Role            : #Axis1,
      DataPoint       : '@UI.DataPoint#price',
      ![@Common.Label]: 'Price',
    }],
    Dimensions         : [
      productName,
      orderDate
    ],
    DimensionAttributes: [
      {
        $Type    : 'UI.ChartDimensionAttributeType',
        Dimension: productName,
        Role     : #Category
      },
      {
        $Type    : 'UI.ChartDimensionAttributeType',
        Dimension: orderDate,
        Role     : #Category2
      }
    ]
  }
});

// annotate my.company.ProductOrder {

//   productName @Common.ValueList: {
//     CollectionPath: 'ProductOrder',
//     Label         : 'Product Name',
//     Parameters    : [{
//       $Type            : 'Common.ValueListParameterInOut',
//       LocalDataProperty: productName,
//       ValueListProperty: 'productName'
//     }]
//   };
// }

// annotate my.company.ProductOrder {

//   orderDate @Common.ValueList: {
//     CollectionPath: 'ProductOrder',
//     Label         : 'Order Date',
//     Parameters    : [{
//       $Type            : 'Common.ValueListParameterInOut',
//       LocalDataProperty: orderDate,
//       ValueListProperty: 'orderDate'
//     }]
//   };
// }

annotate service.ProductOrder {
  orderDate    @sap.aggregation.role: 'dimension'  @Common.ValueList: {
    $Type         : 'Common.ValueListType',
    CollectionPath: 'ProductOrder',
    Label         : 'Order Date',
    Parameters    : [{
      $Type            : 'Common.ValueListParameterInOut',
      LocalDataProperty: orderDate,
      ValueListProperty: 'orderDate'
    }]
  };
  price        @sap.aggregation.role: 'measure'  @Common.IsCurrency;
  productName  @sap.aggregation.role: 'dimension'  @Common.ValueList: {
    CollectionPath: 'ProductOrder',
    Label         : 'Product Name',
    Parameters    : [{
      $Type            : 'Common.ValueListParameterInOut',
      LocalDataProperty: productName,
      ValueListProperty: 'productName'
    }]
  };
  quantity     @sap.aggregation.role: 'measure';
  totalAmount  @sap.aggregation.role: 'measure';

};

annotate service.Employees {
  EmployeeID @sap.hierarchy.node.for       : 'EmployeeID';
  ManagerID  @sap.hierarchy.parent.node.for: 'EmployeeID';
  LEVEL      @sap.hierarchy.level.for      : 'EmployeeID';
  DrillState @sap.hierarchy.drill.state.for: 'EmployeeID';
}
