var app = angular.module("app", ['ngRoute']);

app.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/', {
			templateUrl: 'pages/home.html',
			controller: 'mainCtrl'
		}).
		when('/blog', {
			templateUrl: 'pages/blog.html',
			controller: 'blogCtrl'
		});
	}
]);

app.controller('mainCtrl', function($scope) {
});

app.controller('blogCtrl', function($scope) {
	$scope.message = "blorp";
});
