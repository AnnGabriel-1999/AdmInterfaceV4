var homestead = angular.module('homestead',['ngRoute', 'homestead.controller', 'ngStorage', 'checklist-model']);

homestead.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/login' , {
        templateUrl: 'login.html',
        controller: 'logInCtrlr'
    })

    .when('/viewCourses' , {
		templateUrl: 'view-courses.html',
		controller: 'courseCtrl'
    })

	.when('/viewSections/:courseID/:prefIX/', {
		templateUrl: 'view-sections.html', 
		controller: 'sectionsCtrl'

	})

	.when('/viewAssigned/:sectionID', {
		templateUrl : 'view-assigned.html',
		controller : 'assignedCtrl'
	})

    .when('/home', {
		templateUrl: 'request.html',
		controller: 'requestCtrl'
	})
	

    .otherwise({
        redirectTo: '/home'
    })
}]);

angular.module('homestead.controller',[])
	.controller('logInCtrlr', ['$scope','$http','$location', '$localStorage',function($scope,$http,$location,$localStorage,$rootScope){
		$scope.logIn = function(){
			$localStorage.loggedIn = false;

			sendData = JSON.stringify({"sa_username" : $scope.username , "sa_password" : $scope.password});
			link = "/restAPI/api/Homestead/login.php";

			$http.post(link,sendData).then(function(response){
				if(response.data.success){
                    alert(response.data.success);
					$localStorage.loggedIn = true;
					localStorage.setItem('super_id',response.data.session);
					console.log(localStorage.getItem("super_id"));
 					$location.path("/home");
		}else{
			$scope.error = response.data;
		}
			}).catch(function(response) {
			  	console.log(response);
			});

		};
	}]);

homestead.controller('requestCtrl',function($scope,$http){
	getLink = '/restAPI/api/Homestead/Admins/view-requests.php?status='
	$http.get(getLink).then(function(response){
		$scope.requests = response.data;
		$scope.length = $scope.requests.length;
		console.log($scope.requests);	
	}).catch(function(response){
		console.log(response);
	});

	$scope.showMessage = function(msg) {
		alert(msg);
		$scope.putangina = msg;
		alert($scope.putangina);
	}

	$scope.processRequest = function($reqID, $action){
		sendData = JSON.stringify({"request_id" : $reqID, "action" : $action});
		link = '/restAPI/api/Homestead/Admins/process-admin-request.php';
		$http.post(link, sendData).then(function(response){
			if(response.data.success){
			//	alert("nice one ulol");
			}
		}).catch(function(response){
			console.log(response);
		});
	};

});

homestead.controller('courseCtrl', function($scope, $http, $route){
	getLink = "/restAPI/api/homestead/courses/view-courses.php";
	$http.get(getLink).then(function(response){
		$scope.courses = response.data;
	}).catch(function(response){
		console.log(response);
	});

	$scope.addCourse = function(){
		$scope.words = $scope.courseName.split(' ');
		$scope.prefix = "";
		angular.forEach($scope.words, function(value, key) {
			$scope.prefix += value.substr(0, 1);
		});

		sendData = JSON.stringify({"course_name" : $scope.courseName, "course_prefix" : $scope.prefix});
		link = "/restAPI/api/homestead/courses/add-course.php";
		$http.post(link, sendData).then(function(response){
			console.log(response.data);
			if(response.data.success){
				$('#newCourse-modal').modal('show').modal('hide');
				$route.reload();
			}
		}).catch(function(response){
			console.log(response);
		});
	}

	$scope.getCourseName = function(course_id){
		getLink = "/restAPI/api/homestead/courses/get-course.php?courseID="+course_id;
		$http.get(getLink).then(function(response){
			$scope.upCName = response.data[0].course;
			$scope.courseID = course_id;
			console.log($scope.upCName);
		}).catch(function(response){
			console.log(response);
		});
	}

	$scope.updateCourse = function(course_id){
		$scope.words = $scope.upCName.split(' ');
		$scope.prefix = "";
		angular.forEach($scope.words, function(value, key) {
			$scope.prefix += value.substr(0, 1);
		});

		sendData = JSON.stringify({"courseID" : $scope.courseID, "course_name" : $scope.upCName,  "course_prefix" : $scope.prefix});
		link = "/restAPI/api/homestead/courses/edit-course.php";
		$http.post(link, sendData).then(function(response){
			console.log(response.data);
			if(response.data.success){
				$('#updateCourse-modal').modal('show').modal('hide');
				$route.reload();
			}
		}).catch(function(response){
			console.log(response);
		});

	}

});

homestead.controller('sectionsCtrl', function($scope, $http, $routeParams, $route){
	//$scope.msg = "adasdasdas";
	$scope.prefix = $routeParams.prefIX;
	getLink = "/restAPI/api/homestead/sections/view-sections-by-course.php?course_id="+$routeParams.courseID+"&&syrid=7";
	$http.get(getLink).then(function(response){
		$scope.Sections = response.data;
	}).catch(function(response){
		console.log(response);
	});

	getLink = "/restAPI/api/homestead/courses/get-course.php?courseID="+$routeParams.courseID;
	$http.get(getLink).then(function(response){
		$scope.course = response.data[0].course;
	}).catch(function(response){
		console.log(response);
	});

	$scope.filterSectionView = function(yrlevel){
		if(yrlevel == ""){
			getLink = "/restAPI/api/homestead/sections/view-sections-by-course.php?course_id="+$routeParams.courseID+"&&syrid=7";
		}else{
			getLink = "/restAPI/api/homestead/sections/view-sections-by-year-level.php?course_id="+$routeParams.courseID+"&&year_level="+yrlevel+"&&syrid=7";
		}
		
		$http.get(getLink).then(function(response){
			if(response.data.message){
				$scope.msg = "No section";
				$scope.Sections = null;
			}else{
				$scope.Sections = response.data;
				$scope.msg = null;
			}
		}).catch(function(response){
			console.log(response);
		});
	};

	$scope.getVacant = function(section_id){
		$scope.sectionID = section_id;
		getLink = "/restAPI/api/homestead/admins/view-vacant-admins.php?section_id="+section_id+"&&syrid=7";
		$http.get(getLink).then(function(response){
			if(response.data.message){
				$scope.msg = "No vacant professor";
				$scope.profs = null;
			}else{
				$scope.profs = response.data;
				$scope.adminIDS = [];
				$scope.adminIDS  = $scope.profs.map(function(value) {
					return value.admin_id;
				  });
				console.log("eto: " + $scope.adminIDS);
				$scope.msg = null;
			}
		}).catch(function(response){
			console.log(response);
		});
	}

	$scope.testValue = "";
	$scope.id = [];

	$scope.imChanged = function(admID){
		if($scope.id.indexOf(admID) !== -1) {
			$scope.id.pop(admID);
		}else{
			$scope.id.push(admID);
		}
		$scope.testValue = $scope.id.join(',');
		console.log($scope.testValue);
	}

	$scope.assignProf = function(){
		sendData = JSON.stringify({"admin_ids" : $scope.testValue, "section_id" : $scope.sectionID, "schoolyear_id" : "7"});
		link = "/restAPI/api/homestead/admins/assign-admin-to-section.php";
		$http.post(link, sendData).then(function(response){
			console.log(response.data);
			if(response.data.message){
				console.log('Success');
				$('assignProf-modal').modal('show').modal('hide');
				$route.reload();
			}
		}).catch(function(response){
			console.log(response);
		});
	}
});

homestead.controller('assignedCtrl', function($scope, $http, $routeParams, $route){
	$scope.sectionID = $routeParams.sectionID;
	getLink = "/restAPI/api/homestead/admins/view-assigned-admins.php?section_id="+$scope.sectionID+"&&syrid=7";
		$http.get(getLink).then(function(response){
			if(response.data.message){
				$scope.msg = "No assigned professor";
				console.log($scope.msg);
				$scope.profs = null;
			}else{
				$scope.profs = response.data;
				console.log($scope.profs);
				$scope.msg = null;
			}
		}).catch(function(response){
			console.log(response);
		});
});