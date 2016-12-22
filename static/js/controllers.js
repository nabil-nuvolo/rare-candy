var ngAppControllers = angular.module('ngAppControllers', []);


ngAppControllers.controller('homeController', ['$scope','$http','styleProvider', function($scope, $http, styleProvider) {

	/*
	*	This controller will define our content
	*/

	// Consider too that these data objects may have styles that mutate
	$scope.subHead1LinksData = [
		{'title':'MY SUBREDDITS','separator':'▼'},
		{'title':'FRONT','separator':'-'},
		{'title':'ALL','separator':'-'},
		{'title':'RANDOM','separator':'|'},
		{'title':'ASKREDDIT','separator':'-'},
		{'title':'FUNNY','separator':'-'},
		{'title':'VIDEOS','separator':'-'},
		{'title':'PICS','separator':'-'},
		{'title':'TODAYILEARNED','separator':'-'},
	];

	$scope.contentLinks = {};
	$http({method: 'GET', url: 'https://www.reddit.com/.json'})
			.success(function(data, status, headers, config) {
				console.log(data);
				$scope.contentLinks = data.data.children;
			});

	$scope.translateScore = function(s) {
		if (s<10000) {
			return s;
		}
		return Math.round(s/1000)+"K";
	}

	// TODO: Handle exception cases for no thumbnail posts
	$scope.retrieveImg = function(img) {
		var fallbacks = ['default','self','image'];
		for (let i=0; i<fallbacks.length; i++) {
			if (img==fallbacks[i]) {
				return '';
			}
		}
		return img;
	}

	$scope.getDate = function(d) {
		return new Date(d);
	}

	// Bind service to scope variable to be used in DOM
	$scope.styles = styleProvider;
}]);


ngAppControllers.factory('styleProvider', [function() {

	/*
		*	This provider will control all styles. TODO:Should eventually be generated
		* by the server
		* @Return -- data object containing CSS styles for every element we want
		* 					 to control
	*/

	// TODO: Need to better think through making css style properties numeric
	// 			 Currently exist as strings with "px" and other modifiers

	var styleObj = {
		'header': {
			'border-bottom': '1px solid #5f99cf',
			'background-color': '#cee3f8'
		},
		'subHead1': {
			'height':'18px',
			'font-size':'90%',
			'border-bottom': '1px solid gray',
			'background-color': '#f0f0f0',
			'text-transform':'uppercase',
			'line-height':'18px'
		},
		'subHead1LinksContainer': {
			'margin': 0,
			'padding':'0 5px',
			'list-style': 'none',
			'display': 'inline',
			'font-size':'90%',
		},
		'subHead1Links': {
			'display': 'inline'
		},
		'subHead2': {
			'font-size': 'larger', // Reddit is weird AF with font sizing
		},
		'subHead2Logo': {
			'text-indent': '-9999px',
			'background-img': 'url(reddit.png)',
			'background-position':'0px -1323px',
			'background-repeat': 'no-repeat',
			'height':'40px',
			'width': '120px',
			'display':'inline-block',
			'vertical-align':'bottom',
			'margin-bottom':'3px'
		},
		'item': {
			'container': {
				'margin':'0',
				'margin-bottom':'8px',
				'padding-left':'3px'
			},
			'number': {
				'width':'2.2ex',
				'float':'left',
				'margin-top':'15px',
				'color':'#c6c6c6',
				'font-family':'arial',
				'text-align':'center',
				'margin-top':'25px',
				'font-size':'medium',
				'text-align':'right'
			},
			'upvotecounter': {
				'width':'6.1ex',
				'font-weight':'bold',
				'font-size':'small',
				'float':'left',
				'margin-right':'7px',
				'margin-left':'7px',
				'background':'transparent',
				'overflow':'hidden',
				'text-align':'center',
				'margin-top':'25px'
			},
			'thumbContainer': {
				'margin-right':'5px',
				'margin-bottom':'2px',
				'float':'left',
				'overflow':'hidden',
				'width':'70px'
			},
			'thumb': {
				'height':'70px',
				'width':'70px'
			},
			'mainContent': {
				'min-height':'70px'
			},
			'mainTitle': {
				'font-size':'medium',
				'color':'#551a8b'
			},
			'mainTitleDomain': {
				'font-size':'x-small',
				'color':'#888'
			}
		}
	};

	return styleObj;
}]);


ngAppControllers.controller('urlParamsController', ['$scope', '$routeParams', function($scope, $routeParams) {
	//Example of a basic controller, includes ability to pull route parameters ($routeParams.name defined in app.js routing configuration)
	$scope.data = $routeParams.name + " from URL parameter";
}]);
