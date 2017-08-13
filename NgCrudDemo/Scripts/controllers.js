angular.module("CrudDemoApp.controllers", []).
controller("MainController", ["$scope", "PlayerService", "orderByFilter", function ($scope, PlayerService, orderBy) {
    $scope.message = "Main Controller";

    function newPlayer() {
        this.PlayerId = 0;
        this.Name = '';
        this.Club = '';
        this.Country = '';
        this.Age = 0;
    }

    $scope.newPlayer = new newPlayer();

    PlayerService.GetPlayers().then(function (d) {
        $scope.players = orderBy(d.data.list,'Name');
        $scope.GridOrderedName = 'glyphicon glyphicon-sort-by-attributes';
    })

    $scope.OrderGrid = function (orderByArg)
    {
        var orderDirection = 'glyphicon glyphicon-sort-by-attributes';

        if ($scope.GridOrderBy === orderByArg)
        {
            orderByArg = "-" + orderByArg;
            orderDirection = 'glyphicon glyphicon-sort-by-attributes-alt';
        }

        $scope.GridOrderedName = "";
        $scope.GridOrderedClub = "";
        $scope.GridOrderedCountry = "";
        $scope.GridOrderedAge = "";

        switch (orderByArg)
        {
            case 'Name':
            case '-Name':
                $scope.GridOrderedName = orderDirection;
                break;
            case 'Club':
            case '-Club':
                $scope.GridOrderedClub = orderDirection;
                break;
            case 'Country':
            case '-Country':
                $scope.GridOrderedCountry = orderDirection;
                break;
            case 'Age':
            case '-Age':
                $scope.GridOrderedAge = orderDirection;
                break;
        }

        
        $scope.players = orderBy($scope.players, orderByArg);
        $scope.GridOrderBy = orderByArg;
    }

    $scope.DeletePlayer = function (id, index) {
        $scope.players.splice(index, 1);
        PlayerService.DeletePlayer(id);
    }

    $scope.DeletePlayer = function (id, index) {
        $scope.players.splice(index, 1);
        PlayerService.DeletePlayer(id);
    }

    $scope.AddNewPlayer = function ()
    {
        PlayerService.AddNewPlayer($scope.newPlayer).then(function (response) {
            $scope.players.push(response.data.player);
            //alert(response.data.status);
            $scope.newPlayer = new newPlayer();
        });
    }
    
}]).
controller("AddPlayerController", function ($scope, PlayerService) {
    $scope.message = "Add player details";

    $scope.AddPlayer = function ()
    {
        PlayerService.AddPlayer($scope.player);
    }

}).
controller("EditPlayerController", function ($scope, PlayerService, $routeParams) {
    $scope.message = "Update player details";

    var id = $routeParams.id;

    PlayerService.GetPlayerById(id).then(function (d) {
        $scope.player = d.data.player;
    })

    $scope.UpdatePlayer = function () {
        PlayerService.UpdatePlayer($scope.player);
    }

}).
factory("PlayerService", ["$http", "$location", function ($http, $location) {
    var fac = {};

    fac.GetPlayers = function ()
    {
        return $http.get("/Player/GetPlayers");
    }

    fac.GetPlayerById = function (id) {
        return $http.get("/Player/GetPlayerById", { params: {id: id}});
    }

    fac.AddPlayer = function (player) {
        $http.post("/Player/AddPlayer", player).then(function (response) {
            alert(response.data.status);
        })
    }

    fac.AddNewPlayer = function (player) {
        return $http.post("/Player/AddPlayer", player)
    }


    fac.UpdatePlayer = function (player) {
        $http.post("/Player/UpdatePlayer", player).then(function (response) {
            alert(response.data.status);
        })
    }

    fac.DeletePlayer = function (id) {
        $http.post("/Player/DeletePlayer", { id: id }).then(function (response) {
            alert(response.data.status);
        })
    }

    return fac;
}])
