var app = angular.module('app', ['ngTouch', 'ui.grid']);

function generateArray(numberOfElements, filler){
    var result = [];
    for(var i=0; i < numberOfElements; i++) {
        result.push(filler);
    }
    return result;
}

app.controller('mainController', ['$scope', 'uiGridConstants', function($scope, uiGridConstants){
    var x = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var y = [1, 2, 4, 8, 16, 20, 24, 28, 32];

    $scope.gridOptions = {
        data: generateArray(9, Object.assign({},y)),
        onRegisterApi: function(gridApi) {
            $scope.gridApi = gridApi;
        }
    };

    //ToDo: figure out how to implement the bar chart meaningfully representing data from multirow table (stacked bar chart won't work).
    TESTER = document.getElementById('tester');
    Plotly.plot( TESTER, [{
        x: x,
        y: y,
        type:'bar'}],
        { margin: { t: 0},
            xaxis: {fixedrange: true},
            yaxis: {fixedrange: true}
        }, {scrollZoom: false} );
    TESTER.on('plotly_click', function(data){
        $scope.gridOptions.columnDefs.forEach(function(item) {
            item.cellClass = function(grid, row, col, rowRenderIndex) {
                if (rowRenderIndex == data.points[0].x - 1) {
                    $scope.gridApi.grid.element[0].getElementsByClassName("ui-grid-viewport")[0].scrollTop = rowRenderIndex * 250/$scope.gridOptions.data.length;
                    return 'blue';
                }
                return 'white';
            }
        });

        $scope.gridApi.core.notifyDataChange( uiGridConstants.dataChange.COLUMN );
    });
}]);