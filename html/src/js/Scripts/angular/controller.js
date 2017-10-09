angular.module('principal')
.controller("HomeController",function($scope, $http){
    
})
.controller("PortifolioController",function($scope, $http){
    $scope.DescricaoPortifolio = {};
    $scope.ItensPortifolio = getPortifolioItem();

    $http.get("Ui/Portifolio/ObterPortifolio").then(function(dados){
        $scope.DescricaoPortifolio = dados.data;
    });


    // $http.get("Ui/Portifolio/ObterPortifolioItem").then(function(dados){
    //     $scope.ItensPortifolio = dados.data;
    // });
});