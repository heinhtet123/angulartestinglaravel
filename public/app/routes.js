var app= angular.module('items-App',['ngRoute','ui.bootstrap']);

app.config(['$routeProvider',function($routeProvider){
	$routeProvider.
	when('/',{
	templateUrl:'templates/home.html',
	controller:	'AdminController'
	}).
	when('/items',{
	templateUrl:'templates/items.html',
	controller:'ItemController'
	}).
	when('/itemscreate',{
    templateUrl: 'templates/itemscreate.html',
    controller: 'ItemController'
    }).
    otherwise({templateUrl:'templates/404.html'});

}]);