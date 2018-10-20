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

	.when('/viewSY', {
		templateUrl : 'school-years.html',
		controller: 'syCtrl'
	})

	.when('/viewAdmins', {
		templateUrl : 'employee-list.html',
		controller : 'empCtrl'
	})

    .when('/home', {
		templateUrl: 'request.html',
		controller: 'requestCtrl'
	})

	.when('/viewStudents/:section_id/:courseID', {
		templateUrl: 'view-students.html',
		controller : 'studentCtrl'
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

	getLink = '/restAPI/api/homestead/schoolyears/get-active-sy.php';
	$http.get(getLink).then(function(response){
		localStorage.setItem('activeSY',response.data[0].schoolyear_id);
		console.log("eto yun: "+localStorage.getItem('activeSY'));
	}).catch(function(response){
		console.log(response);
	});



	var myEl = angular.element( document.querySelector( '#COURSES' ) );
	myEl.removeClass('hs-side-selected');   
	var myEl = angular.element( document.querySelector( '#calendar' ) );
	myEl.removeClass('hs-side-selected'); 
	var myEl = angular.element( document.querySelector( '#admins' ) );
	myEl.removeClass('hs-side-selected'); 
	var myEl = angular.element( document.querySelector( '#requests' ) );
	myEl.addClass('hs-side-selected');


	getLink = '/restAPI/api/Homestead/Admins/view-requests.php?status=';
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
		alert($reqID);
		alert($action);
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

	$scope.getListRequest = function(status) {
		getLink = '/restAPI/api/Homestead/Admins/view-requests.php?status=' + status;
		$http.get(getLink).then(function(response){
			$scope.requests = response.data;
			$scope.length = $scope.requests.length;
		console.log($scope.requests);	
		}).catch(function(response){
			console.log(response);
		});
	}

});

homestead.controller('courseCtrl', function($scope, $http, $route){


	var myEl = angular.element( document.querySelector( '#requests' ) );
	myEl.removeClass('hs-side-selected');
	var myEl = angular.element( document.querySelector( '#calendar' ) );
	myEl.removeClass('hs-side-selected'); 
	var myEl = angular.element( document.querySelector( '#admins' ) );
	myEl.removeClass('hs-side-selected'); 
	var myEl = angular.element( document.querySelector( '#COURSES' ) );
	myEl.addClass('hs-side-selected');

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
	$scope.courseID = $routeParams.courseID;
	getLink = "/restAPI/api/homestead/sections/view-sections-by-course.php?course_id="+$routeParams.courseID+"&&syrid="+localStorage.getItem('activeSY');
	$http.get(getLink).then(function(response){
		$scope.Sections = response.data;
		console.log(response.data);
	}).catch(function(response){
		console.log(response);
	});

	$scope.prefixer = function(yrlevel){
		$scope.txt2 = $scope.sectionName.split('');
		if(yrlevel == 1){
			$scope.text = "1";	
		}else if (yrlevel == 2){
			$scope.text = "2";	
		}else if (yrlevel == 3){
			$scope.text = "3";	
		}else if (yrlevel == 4) {
			$scope.text = "4";	
		}else{
			$scope.text = "";
		}

		$scope.index = 0;
		if (~$scope.index) {
			$scope.txt2[$scope.index] = $scope.text;
		}
		if($scope.sectionName == undefined) {
			$scope.sectionName = "";
		}
		$scope.sectionName = $scope.txt2.join('');
		console.log($scope.sectionName);
	}

	$scope.addSection = function(){
		sendData = JSON.stringify({"courseID" : $routeParams.courseID, "section_name" : $scope.sectionName, "year_level" : $scope.yrLevel});
		link = "/restAPI/api/homestead/sections/add-section.php";
		$http.post(link, sendData).then(function(response){
			console.log(response.data);
			if(response.data.success){
				console.log('Success');
				$('newSection-modal').modal('show').modal('hide');
				$route.reload();
			}else if (response.data.message){
				alert(response.data.message);
			}
		}).catch(function(response){
			console.log(response);
		});
	}



	getLink = "/restAPI/api/homestead/courses/get-course.php?courseID="+$routeParams.courseID;
	$http.get(getLink).then(function(response){
		$scope.course = response.data[0].course;
	}).catch(function(response){
		console.log(response);
	});

	$scope.filterSectionView = function(yrlevel){
		if(yrlevel == ""){
			getLink = "/restAPI/api/homestead/sections/view-sections-by-course.php?course_id="+$routeParams.courseID+"&&syrid="+localStorage.getItem('activeSY');
		}else{
			getLink = "/restAPI/api/homestead/sections/view-sections-by-year-level.php?course_id="+$routeParams.courseID+"&&year_level="+yrlevel+"&&syrid="+localStorage.getItem('activeSY');
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
		getLink = "/restAPI/api/homestead/admins/view-vacant-admins.php?section_id="+section_id+"&&syrid="+localStorage.getItem('activeSY');
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
		sendData = JSON.stringify({"admin_ids" : $scope.testValue, "section_id" : $scope.sectionID, "schoolyear_id" : localStorage.getItem('activeSY')});
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

	$scope.getSecData = function(sec_id){
		getLink = "/restAPI/api/homestead/sections/get-section.php?section_id="+sec_id;
		$http.get(getLink).then(function(response){
			if(response.data.message){
				$scope.msg = "No section";
				$scope.sect = null;
			}else{
				$scope.sect = response.data;
				$scope.msg = null;
				$scope.sectionName = $scope.sect[0].section;
				$scope.yrLevel = $scope.sect[0].year_level;
				$scope.sec_id = $scope.sect[0].section_id;
				console.log($scope.sect);
			}
		}).catch(function(response){
			console.log(response);
		});
	}

	$scope.updateSection = function(){
		sendData = JSON.stringify({"section_id" : $scope.sec_id, "year_level" : $scope.yrLevel, "section_name" : $scope.sectionName, "courseID" : $scope.courseID});
		link = "/restAPI/api/homestead/sections/edit-section.php";
		$http.post(link, sendData).then(function(response){
			console.log(response.data);
			if(response.data.message){
				console.log('Success');
				$('updateSection-modal').modal('show').modal('hide');
				$route.reload();
			}
		}).catch(function(response){
			console.log(response);
		});
	}


});

homestead.controller('assignedCtrl', function($scope, $http, $routeParams, $route){
	$scope.sectionID = $routeParams.sectionID;
	getLink = "/restAPI/api/homestead/admins/view-assigned-admins.php?section_id="+$scope.sectionID+"&&syrid="+localStorage.getItem('activeSY');
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



homestead.controller('syCtrl', function ($scope, $http,$location){

	var myEl = angular.element( document.querySelector( '#requests' ) );
	myEl.removeClass('hs-side-selected');
	var myEl = angular.element( document.querySelector( '#COURSES' ) );
	myEl.removeClass('hs-side-selected'); 
	var myEl = angular.element( document.querySelector( '#admins' ) );
	myEl.removeClass('hs-side-selected'); 
	var myEl = angular.element( document.querySelector( '#calendar' ) );
	myEl.addClass('hs-side-selected');

	getLink = "/restAPI/api/homestead/schoolyears/get-all-sy.php";
	$http.get(getLink).then(function(response){
		if(response.data.message){
			$scope.msg1 = "No active schoolyear";
			console.log($scope.msg1);
			$scope.sys = null;
		}else{
			$scope.sys = response.data;
			console.log($scope.sys);
			$scope.msg1 = null;
		}
	}).catch(function(response){
		console.log(response);
	});

	
	getLink = "/restAPI/api/homestead/schoolyears/get-active-sy.php";
	$http.get(getLink).then(function(response){
		if(response.data.message){
			$scope.msg = "No active schoolyear";
			console.log($scope.msg);
			$scope.profs = null;
		}else{
			$scope.sy = response.data;
			if($scope.sy[0].semester == "2") {
				$scope.sy[0].semester = "2nd Semester of";
			}else if ($scope.sy[0].semester == "1") {
				$scope.sy[0].semester = "1st Semester of";
			}else{
				$scope.sy[0].semester = "Midyear of"
			}
			console.log($scope.sy);
			$scope.msg = null;
		}
	}).catch(function(response){
		console.log(response);
	});

	$scope.addSY = function(){
		$scope.newSY = $scope.start + "-" + $scope.end;
		sendData = JSON.stringify({"schoolyear" : $scope.newSY});
		link = "/restAPI/api/homestead/SchoolYears/add-school-year.php";
		$http.post(link, sendData).then(function(response){
			console.log( $scope.start + "-" + $scope.end);
			if(response.data.success){
				console.log('Success');
				$('newSY-modal').modal('show').modal('hide');
				$route.reload();
			}else{
				console.log(response.data);
			}
		}).catch(function(response){
			console.log(response);
		});
	}

	$scope.passSYData = function(schoolyear, semester, id){
		$scope.schoolyear = schoolyear;
		$scope.semester = semester;
		$scope.schoolyear_id = id;
	}

	$scope.activateSY = function(schoolyear_id){
		alert(schoolyear_id);
		getLink = "/restAPI/api/homestead/schoolyears/set-school-year.php?yrid="+$scope.schoolyear_id;
		$http.get(getLink).then(function(response){
			console.log(response.data);
		}).catch(function(response){
			console.log(response);
		});
	}

	$scope.addEnd = function(){
		$scope.end = $scope.start*1 + 1;
	}
});

homestead.controller('studentCtrl', function($scope, $http, $location, $routeParams, $route){

	getLink = "/restAPI/api/homestead/Students/view-students.php?section_id="+$routeParams.section_id+"&&syrid="+localStorage.getItem('activeSY');
	$http.get(getLink).then(function(response){
		if(response.data.message){
			$scope.msg1 = "No students";
			console.log($scope.msg1);
			$scope.studs = null;
		}else{
			$scope.studs = response.data;
			$scope.msg1 = null;
		}
	}).catch(function(response){
		console.log(response);
	});

	getLink = "/restAPI/api/homestead/Students/get-course-section.php?course_id="+$routeParams.courseID+"&&section_id="+$routeParams.section_id;
	$http.get(getLink).then(function(response){
		if(response.data.error){
			$scope.msg2 = "No section found!!!";
			console.log($scope.msg1);
			$scope.sec = null;
		}else{
			$scope.sec = response.data;
			$scope.pref = $scope.sec[0].pref;
			$scope.sec = $scope.sec[0].section;
			$scope.msg2 = null;
		}
	}).catch(function(response){
		console.log(response);
	});


	$scope.addStudent = function() {
		sendData = JSON.stringify({	"student_id" : $scope.studID, 
									"section_id" : $routeParams.section_id,
									"course_id" : $routeParams.courseID,
									"fname" : $scope.fname,
									"mname" : $scope.mname,
									"lname" : $scope.lname,
									"schoolyear_id" : localStorage.getItem('activeSY')});
		link = "/restAPI/api/homestead/students/upload_student.php";
		$http.post(link, sendData).then(function(response){
			if(response.data.success){
				console.log('Success');
				$('#newStudent-modal').modal('show').modal('hide');
				$route.reload();
			}else{
				console.log(response.data);
			}
		}).catch(function(response){
			console.log(response);
		});
	}

	$scope.getStudentData = function(student_id) {
		getLink = "/restAPI/api/homestead/courses/view-courses.php";
		$http.get(getLink).then(function(response){
			$scope.courses = response.data;
			console.log($scope.courses);
		}).catch(function(response){
			console.log(response);
		});

		getLink = "/restAPI/api/homestead/sections/view-sections-by-course.php?course_id="+$routeParams.courseID+"&&syrid="+localStorage.getItem('activeSY');
		$http.get(getLink).then(function(response){
			$scope.Sections = response.data;
			console.log(response.data);
		}).catch(function(response){
			console.log(response);
		});


		getLink = "/restAPI/api/homestead/students/get-single-student.php?student_id="+student_id;
		$http.get(getLink).then(function(response){
			if(response.data.error){
				$scope.msg2 = "No student found!!!";
				$scope.stud = null;
			}else{
				$scope.stud = response.data;
				$scope.fname = $scope.stud[0].fname;
				$scope.mname = $scope.stud[0].mname;
				$scope.lname = $scope.stud[0].lname;
				$scope.studID = $scope.stud[0].student_id;
				$scope.oldID =  $scope.stud[0].student_id;
				$scope.courseID = $scope.stud[0].courseID;
				$scope.sectionID = $scope.stud[0].sec_id;
				console.log($scope.stud);
			}
		}).catch(function(response){
			console.log(response);
		});
	}

	$scope.refreshSec = function(courseID) {
		getLink = "/restAPI/api/homestead/sections/view-sections-by-course.php?course_id="+courseID+"&&syrid="+localStorage.getItem('activeSY');
		$http.get(getLink).then(function(response){
			$scope.Sections = response.data;
			console.log(response.data);
		}).catch(function(response){
			console.log(response);
		});
	}

	$scope.updateStudent = function() {
		sendData = JSON.stringify({	"new_id" : $scope.studID,
									"student_id" : $scope.oldID,
									"fname" : $scope.fname,
									"mname" : $scope.mname,
									"lname" : $scope.lname,
									"section_id" : $scope.sectionID});
		link = "/restAPI/api/homestead/students/edit-student.php";
		$http.post(link, sendData).then(function(response){
			if(response.data.success){
				console.log('Success');
				$('#updateStudent-modal').modal('show').modal('hide');
				$route.reload();
			}else{
				console.log(response.data);
			}
		}).catch(function(response){
			console.log(response);
		});
	}

});

homestead.controller('empCtrl', function($scope, $http, $routeParams) {
	var myEl = angular.element( document.querySelector( '#COURSES' ) );
	myEl.removeClass('hs-side-selected'); 
	var myEl = angular.element( document.querySelector( '#calendar' ) );
	myEl.removeClass('hs-side-selected'); 
	var myEl = angular.element( document.querySelector( '#requests' ) );
	myEl.removeClass('hs-side-selected'); 
	var myEl = angular.element( document.querySelector( '#admins' ) );
	myEl.addClass('hs-side-selected'); 

	getLink = "/restAPI/api/homestead/admins/view-registered-admins.php";
	$http.get(getLink).then(function(response){
		$scope.admins = response.data;
		console.log(response.data);
	}).catch(function(response){
		console.log(response);
	});

});