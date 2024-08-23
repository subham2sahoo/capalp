using companyServ as service from '../../srv/model';

annotate service.ProductOrder with@(
    UI                                             : {
    LineItem       : [
      {
        $Type: 'UI.DataField',
        Value: productName,
      },
      {$Type: 'UI.DataField',Value: price},
      {$Type: 'UI.DataField',Value: orderDate}
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
