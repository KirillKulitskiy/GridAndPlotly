var app = angular.module('app', ['ngTouch', 'ui.grid']);

app.controller('mainController', ['$scope', 'uiGridConstants', function($scope, uiGridConstants){
    console.log("another trial");
    $scope.x = [1, 2, 3, 4, 5];
    $scope.y = [1, 2, 4, 8, 16];

    $scope.gridData = [
        {
            1: $scope.y[0],
            2: $scope.y[1],
            3: $scope.y[2],
            4: $scope.y[3],
            5: $scope.y[4]
        }];

    $scope.gridOptions = {
        data: $scope.gridData,
        columnDefs: [
            {field: 1,
                cellClass: 'white'},
            {field: 2,
                cellClass: 'white'},
            {field: 3,
                cellClass: 'white'},
            {field: 4,
                cellClass: 'white'},
            {field: 5,
                cellClass: 'white'}],
        onRegisterApi: function(gridApi) {
            $scope.gridApi = gridApi;
        }
    };

    //ToDo: figure out how to implement the bar chart meaningfully representing data from multirow table (stacked bar chart won't work).
    $scope.chartType = 'bar';
    TESTER = document.getElementById('tester');
    Plotly.plot( TESTER, [{
        x: $scope.x,
        y: $scope.y,
        type:$scope.chartType}], {
        margin: { t: 0 } } );
    TESTER.on('plotly_click', function(data){
        for(var i=0; i < $scope.gridOptions.columnDefs.length; i++) {
            $scope.gridOptions.columnDefs[i].field == data.points[0].x ? $scope.gridOptions.columnDefs[i].cellClass = 'blue' : $scope.gridOptions.columnDefs[i].cellClass = 'white';
        }

        $scope.gridApi.core.notifyDataChange( uiGridConstants.dataChange.COLUMN );
    });
}]);