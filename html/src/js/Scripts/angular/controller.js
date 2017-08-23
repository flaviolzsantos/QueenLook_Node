angular.module('principal')
.controller("HomeController",function($scope, $http){
    
})
.controller("PortifolioController",function($scope, $http){
    $scope.DescricaoPortifolio = {};
    $scope.ItensPortifolio = [];

    $http.get("Ui/Portifolio/ObterPortifolio").then(function(dados){
        $scope.DescricaoPortifolio = dados.data;
    });
});