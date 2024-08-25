using companyServ as service from '../../srv/model';

annotate service.ProductOrder with@(
    UI                                             : {
    LineItem       : [
      {
        $Type: 'UI.DataField',
        Value: productName
      },
      {$Type: 'UI.DataField',Value: price},
      {$Type: 'UI.DataField',Value: orderDate},
      {$Type: 'UI.DataField',Value: quantity},
      {$Type: 'UI.DataField',Value:totalAmount}
    ],
    SelectionFields  : [
        productName,
        orderDate
    ],
    
    DataPoint #dataPointForChart: {
                                Value: price},
    Chart            : {
          $Type             : 'UI.ChartDefinitionType',
          Title : 'Product Price',
          Description : 'Price',
          ChartType         : #Column,
          Measures          : [price],
          MeasureAttributes : [{
              $Type     : 'UI.ChartMeasureAttributeType',
              Measure   : price,
              Role      : #Axis1,
              DataPoint : '@UI.DataPoint#dataPointForChart',
          }],
          Dimensions:[productName],
          DimensionAttributes:[
            {
              $Type     : 'UI.ChartDimensionAttributeType',
              Dimension   : productName,
              Role      : #Category
          }
          ]
      }
  }
);

annotate my.company.ProductOrder {

   productName @Common.ValueList: {
    CollectionPath : 'ProductOrder',
    Label : '',
    Parameters : [
    {$Type: 'Common.ValueListParameterInOut', LocalDataProperty: productName, ValueListProperty: 'productName'}
    ]
  };
}

annotate my.company.ProductOrder {

   orderDate @Common.ValueList: {
    CollectionPath : 'ProductOrder',
    Label : '',
    Parameters : [
    {$Type: 'Common.ValueListParameterInOut', LocalDataProperty: orderDate, ValueListProperty: 'orderDate'}
    ]
  };
}
