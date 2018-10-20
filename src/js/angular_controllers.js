var theApp = angular.module('theApp',['ngRoute','theApp.controller','ngStorage']);

theApp.directive('fileInput',function($parse){
	return{
		restrict:'A',
		link:function(scope,element,attribute){
			element.bind('change',function(){
				$parse(attribute.fileInput)
				.assign(scope,element[0].files)
				scope.$apply();
				document.getElementsByClassName("custom-file-label")[0].innerHTML = element[0].files[0].name;
			});
		}
	}
});


theApp.config(['$routeProvider', function($routeProvider) {

	$routeProvider
		.when('/home' , {
			resolve:{
 					"check": function($location,$localStorage){
 							if ($localStorage.loggedIn){
 									$location.path("/myquizzen");
 							}
 					}
 			},
			templateUrl: 'login.html',
     		controller: 'logInCtrlr'
		})

		.when('/viewSection/:section_id' , {

			templateUrl: 'list-section-students.html',
     		controller: 'viewSectionsCtrlr'
		})

        .when('/myquizzen' , {
					resolve:{
							 "check": function($location,$localStorage){
									 if (!$localStorage.loggedIn){
											 $location.path("/login");
									 }
							  }
					 },
			templateUrl: 'howm.html',
            controller: 'viewQuizzesCtrlr'
		})
        .when('/signup/:mnemonic', {
					resolve:{
							 "check": function($location,$localStorage){
									 if ($localStorage.loggedIn){
											 $location.path("/myquizzen");
									 }
							  }
					 },
            templateUrl: 'signup.html',
            controller: 'registerCtrlr'
        })

        .when('/createquiz',{
					resolve:{
							 "check": function($location,$localStorage){
									 if (!$localStorage.loggedIn){
											 $location.path("/login");
									 }
							  }
					 },
        	templateUrl:'new-quizzen.html',
        	controller: 'viewQuizzesCtrlr'
        })

        .when('/editquiz/:quiz_id', {
					resolve:{
							 "check": function($location,$localStorage){
									 if (!$localStorage.loggedIn){
											 $location.path("/login");
									 }
							  }
					 },
        	templateUrl:'edit-quizzen.html',
        	controller: 'updateQuizCtrlr'
		})

		.when('/sectionslist', {
			resolve:{
					 "check": function($location,$localStorage){
							 if (!$localStorage.loggedIn){
									 $location.path("/login");
							 }
						}
			 },
			templateUrl:'list-sections.html',
			controller: 'listSecCtrlr'
		})

		.when('/viewstudent', {
			resolve:{
					 "check": function($location,$localStorage){
							 if (!$localStorage.loggedIn){
									 $location.path("/login");
							 }
						}
			 },
			templateUrl:'view-student-profile.html'
		//	controller: 'listSecCtrlr'
		})

		.when('/addPart/:quiz_id', {
			resolve:{
					 "check": function($location,$localStorage){
							 if (!$localStorage.loggedIn){
									 $location.path("/login");
							 }
						}
			 },
        	templateUrl:'add-part.html',
        	controller: 'quizParts'
		})
        
        .when('/published/:quiz_id/Segment', {
			resolve:{
					 "check": function($location,$localStorage){
							 if (!$localStorage.loggedIn){
									 $location.path("/login");
							 }
						}
			 },
				templateUrl:'published-segments2.html',
				controller: 'readOnlyCtrlr'
		})
    
        .when('/published/:quiz_id/Freeflow', {
			resolve:{
					 "check": function($location,$localStorage){
							 if (!$localStorage.loggedIn){
									 $location.path("/login");
							 }
						}
			 },
				templateUrl:'published-freeflow.html',
				controller: 'readOnlyCtrlr'
		})
    
		.when('/viewparts/:quiz_id/Segment', {
			resolve:{
					 "check": function($location,$localStorage){
							 if (!$localStorage.loggedIn){
									 $location.path("/login");
							 }
						}
			 },
				templateUrl:'view-parts.html',
				controller: 'partsCtrlr'
		})
        
        .when('/viewparts/:quiz_id/Freeflow', {
			resolve:{
					 "check": function($location,$localStorage){
							 if (!$localStorage.loggedIn){
									 $location.path("/login");
							 }
						}
			 },
				templateUrl:'view-freeflow.html',
				controller: 'partsCtrlr'
		})

		.when('/updatePart/:part_id/:totalqs', {
			resolve:{
					 "check": function($location,$localStorage){
							 if (!$localStorage.loggedIn){
									 $location.path("/login");
							 }
						}
			 },
				templateUrl:'update-part.html',
				controller: 'updatePart'
		})

        .when('/checker/1/:quiz_id/:part_id', {
					resolve:{
							 "check": function($location,$localStorage){
									 if (!$localStorage.loggedIn){
											 $location.path("/login");
									 }
								}
					 },
                    templateUrl:'multiple_choice.html',
                    controller: 'multipleCtrlr'
        })

        .when('/checker/2/:quiz_id/:part_id', {
					resolve:{
							 "check": function($location,$localStorage){
									 if (!$localStorage.loggedIn){
											 $location.path("/login");
									 }
								}
					 },
                templateUrl:'true-or-false.html',
                controller: 'addCtrlr'
        })

        .when('/addstudent', {
					resolve:{
							 "check": function($location,$localStorage){
									 if (!$localStorage.loggedIn){
											 $location.path("/login");
									 }
								}
					 },
                templateUrl:'add-student.html',
                controller: 'addStudentCtrlr'
		})


        .when('/updatestudent/:student_number', {

                templateUrl:'update-student.html',
                controller: 'updateStudentCtrlr'
        })

        .when('/uploadCS', {

                templateUrl:'uploadCsvStudents.html',
                controller: 'CSVSTUDENTS'
        })

        .when('/checker/4/:quiz_id/:part_id', {
					resolve:{
							 "check": function($location,$localStorage){
									 if (!$localStorage.loggedIn){
											 $location.path("/login");
									 }
							  }
					 },
            templateUrl:'guess_word.html',
            controller: 'guessCtrlr'
		})
		
		.when('/empCheck', {
			resolve:{
					 "check": function($location,$localStorage){
							 if ($localStorage.loggedIn){
									 $location.path("/myquizzen");
							 }
					  }
			 },
			templateUrl: 'employee-check.html',
			controller: 'empIDChecker'
		})

		.when('/adminRequest', {
			resolve:{
				"check": function($location,$localStorage){
						if ($localStorage.loggedIn){
								$location.path("/myquizzen");
						}
				 }
			},
			templateUrl: 'employee-request.html',
			controller: 'empRequest'
		})

		.when('/viewByTag/:tag_name/:tag_id', {
		
			templateUrl: 'view-by-tag.html',
			controller: 'viewTagCtrl'

		})
		
		.when('/logout', {
						resolve:{
								 "check": function($location,$localStorage){
										 if (!$localStorage.loggedIn){
												 $location.path("/login");
										 }
								 }
						 },
							templateUrl: 'login.html',
							controller: 'logoutCtrlr'
				 }).otherwise({
				redirectTo: '/home'
			})
	}]);

	theApp.controller('logoutCtrlr',function($location,$window,$localStorage){
	     window.localStorage.removeItem('user_id');
	       $localStorage.loggedIn = false;
	    $location.path("/login");
	});

	angular.module('theApp.controller',[])
	.controller('logInCtrlr', ['$scope','$http','$location', '$localStorage',function($scope,$http,$location,$localStorage,$rootScope){
		$scope.logIn = function(){
			$localStorage.loggedIn = false;

			sendData = JSON.stringify({"sent_username" : $scope.angUsername , "sent_password" : $scope.angPassword});
			link = "/restAPI/api/Hosts/login_hosts.php";

			$http.post(link,sendData).then(function(response){
				if(response.data.success){
					$localStorage.loggedIn = true;
					localStorage.setItem('user_id',response.data.session);
					console.log(localStorage.getItem("user_id"));
 					$location.path("/myquizzen");
		}else{
			$scope.error = response.data;
		}
			}).catch(function(response) {
			  	console.log(response);
			});

		};
	}]);

theApp.controller('registerCtrlr', function($scope,$http,$location, $routeParams){
	$scope.info = $routeParams.mnemonic.split('*');
	$scope.fname = $scope.info[0];
	$scope.lname = $scope.info[1];
	$scope.empID = $scope.info[2];
	alert($scope.empID);
	$scope.signUp = function(){
		sendData = JSON.stringify({"mirror_id" : $scope.empID, "password" : $scope.password1 ,  "username" : $scope.username ,  "confirm_pw" : $scope.password2});

		link = "/restAPI/api/Hosts/register_hosts.php";

		$http.post(link,sendData).then(function(response){
			if(response.data.success){
				alert(response.data.success);
				$location.path('/login');
			}else{
				$scope.error = response.data;
			}
		}).catch(function(response){
			console.log(response);
		});
	};

});

theApp.controller('addSectionCtrlr',function($scope,$http){

	$scope.courseId= "1";
	//get courses
	getLink = '/restAPI/api/Hosts/list_courses.php';
	$http.get(getLink).then(function(response){
		$scope.reply = response.data.courses;
	}).catch(function(response){
		console.log(response);
	});


	//post data
	$scope.addSection = function(){

		sendData = JSON.stringify({"course" : $scope.courseId , "section" : $scope.section});
		link = '/restAPI/api/Hosts/Sections/add_section.php'
		$http.post(link,sendData).then(function(response){
			if(response.data.message =="Section successfully added."){
				alert("boom nag post ano na next ");
			}else{
				$scope.error = response.data;
			}
		}).catch(function(response){
			console.log(response);
		});

	}
});



theApp.controller('updateStudentCtrlr' , function($scope,$http,$routeParams){

	//eto yung para sa select element nilalagyan lang nila yon ng laman

	getLink = '/restAPI/api/Hosts/list_courses.php'
	$http.get(getLink).then(function(response){

		$scope.replySections = response.data.sections;
		$scope.replyCourses = response.data.courses;
		console.log(response.data.courses);
	}).catch(function(response){
		console.log(response);
	});

	getLink2 = '/restAPI/api/Hosts/manageStudent/read_single.php?stud_id='+$routeParams.student_number;
	$http.get(getLink2).then(function(response){
		console.log("eto");
		console.log(response.data);
		$scope.courseId = response.data[0].course_id;
		$scope.sectionId = response.data[0].section_id;
		$scope.currentStudId = response.data[0].student_id;
		$scope.fname =  response.data[0].fname;
		$scope.mname = response.data[0].mname;
		$scope.lname = response.data[0].lname;

	}).catch(function(response){
		alert("wala");
	});

	$scope.saveStud = function(){

		sendData = JSON.stringify({"currentStudId" : $scope.currentStudId, "courseId" : $scope.courseId, "sectionId" : $scope.sectionId, "fname" : $scope.fname , "mname" : $scope.mname , "lname" : $scope.lname , "student_id" : $routeParams.student_number });
		link = '/restAPI/api/Hosts/manageStudent/update.php';
		$http.post(link,sendData).then(function(response){
			if(response.data.success){
				alert("BOMBAHAN!");
			}else{
				$scope.error = response.data;
			}
		}).catch(function(response){
			console.log(response.data);
		});
	}


});

theApp.controller('listCtrlr', function($scope,$http){

	getLink = '/restAPI/api/Hosts/list_courses.php';

	$http.get(getLink).then(function(response){
		$scope.students = response.data.names.students;
	}).catch(function(response){
		console.log(response);
	});

});

theApp.controller('listSecCtrlr', function($scope, $http, $route, $location){



	getLink = '/restAPI/api/Hosts/list_courses.php';
    $scope.prefix = "SECTION";

	$http.get(getLink).then(function(response){
	  $scope.sections = response.data.sections;
      console.log(response.data.sections);
	}).catch(function(response){
	  console.log(response);
	});

    //GET SECTION INFO
    $scope.getSecData = function (section_id) {
        getLink = '/restAPI/api/Sections/singleSection.php?section_id='+$scope.section_id;
        $http.get(getLink).then(function (response) {
            $scope.section_info = response.data;
            console.log($scope.section_info[0].course);
        }).catch(function (response) {
            console.log(response);
        });

    }

    //GET ALL COURSES
    $scope.getCourses = function() {
        getLink = '/restAPI/api/Courses/viewCourses.php';
        $http.get(getLink).then(function (response) {
            $scope.courses = response.data;
            console.log($scope.courses[0].course_id);
        }).catch(function (response) {
            console.log(response);
        });
    }


   //SET PREFIX
    $scope.setPrefix = function(course_id) {
        getLink = '/restAPI/api/Courses/getCoursePrefix.php?course_id='+course_id;
        $http.get(getLink).then(function (response) {
            $scope.prefix = response.data[0].prefix;
            console.log(response.data);
        }).catch(function (response) {
            console.log(response);
        });

    }


    //ADD SECTION
    $scope.addSection = function(course_id) {
        sendData = JSON.stringify({"course_id" : course_id, "admin_id" : localStorage.getItem('user_id'), "section" : $scope.sectionName});
        link = '/restAPI/api/Sections/addSection.php';
        $http.post(link,sendData).then(function(response){
            alert('Section inserted.');
            $('#sectionModalAdd').modal('show').modal('hide');
            $route.reload();
	     }).catch(function(response){
            console.log(response);
	     });

    }

    $scope.transferSectionData = function(section_id, course_id, section_name) {
        $scope.courseID = course_id;
        $scope.sectionName = section_name;
        $scope.getCourses();
        $scope.setPrefix(course_id);
        $scope.section_id = section_id;
        getLink = '/restAPI/api/Sections/singleSection.php?section_id='+section_id;
        $http.get(getLink).then(function (response) {
            $scope.section_info = response.data;
            console.log($scope.section_info);
            console.log($scope.section_info[0].course);
        }).catch(function (response) {
            console.log(response);
        });
    }

    $scope.updateSection = function(courseID, sectionName, section_id) {
        sendData = JSON.stringify({"course_id": courseID, "admin_id": localStorage.getItem('user_id'), "section_id": $scope.section_id, "section": sectionName});
        link = '/restAPI/api/Sections/updateSection.php';
        $http.post(link,sendData).then(function(response){
            alert('Section updated.');
            $('#sectionModalEdit').modal('show').modal('hide');
            $route.reload();
	   }).catch(function(response){
            console.log(response);
	   });
    }

});

theApp.controller('viewSectionsCtrlr', function($scope,$http,$routeParams){



	getLink = "/restAPI/api/Hosts/Sections/list_section_students.php?section_id="+$routeParams.section_id;
	$http.get(getLink).then(function(response){

		if(response.data.message){
			$scope.noStudents = response.data;
		}else{
			console.log(response.data);
			$scope.students = response.data.data;
		}
	}).catch(function(response){
	  console.log(response);
	});



	$scope.getData = function (){
		//GET COURSES AND SECTIONS
		getLink = '/restAPI/api/Hosts/list_courses.php'
		$http.get(getLink).then(function(response){
			$scope.replySections = response.data.sections;
			$scope.replyCourses = response.data.courses;

		}).catch(function(response){
			console.log(response);
		});
	};

	//POST DATA
	$scope.addStudent = function(){
		postLink = "/restAPI/api/Hosts/manageStudent/upload_student.php";
		sendData = JSON.stringify({"student_id" : $scope.studid , "section_id" : $scope.sectionId , "course_id" : $scope.courseId  , "fname" : $scope.fname ,  "mname" : $scope.mname ,  "lname" : $scope.lname });

		$http.post(postLink,sendData).then(function(response){
			if(response.data.success){
				alert("yipeeeee");
			}else{
				$scope.error = response.data;
			}
		}).catch(function(response){
			console.log(response);
		});
	}

});

theApp.controller('viewQuizzesCtrlr', function($scope, $http , $routeParams ,$location){

   $scope.quizTitle = 'MyQuizzenNo.0';
   getLink = "/restAPI/api/quizzes/read_quiz.php?admin_id="+ localStorage.getItem('user_id');
   $http.get(getLink).then(function(response){
       if(response.data.message){
		   $scope.error = response.data.message;
       }else{
		$scope.quizInfo = response.data;
		$scope.quizTitle = 'MyQuizzenNo.'+(response.data.length+1);
       }
   });

   getLink = "/restAPI/api/quizzes/view-tags.php?admin_id="+localStorage.getItem('user_id');
   $http.get(getLink).then(function(response){
	if(response.data){
		$scope.folders = response.data;
		console.log($scope.folders);
	}
});


   $scope.getQuizData = function (quizID) {
       $scope.quizID = quizID;
		getLink = "/restAPI/api/Quizzes/readsingle_quiz.php?quizID="+ quizID;
		$http.get(getLink).then(function(response){
			console.log(response.data);
			$scope.quizTitle = response.data.quiz_title;
			$scope.quizDesc = response.data.description;
		});
   }

   $scope.updateQuiz = function(quizID, quizTitle, quizDesc){
		sendData = JSON.stringify({"quizID" : quizID , "quizTitle" : quizTitle , "description" : quizDesc });
	 	link = '/restAPI/api/Quizzes/update_quiz.php';
		$http.post(link,sendData).then(function(response){
		 if(response.data.success){
			 alert("Quiz Updated Sucessfully!");
             $('#editQuiz-modal').modal('show').modal('hide');
			 $location.path('/home');
		 }else{
			 $scope.error = response.data;
		 }
	 }).catch(function(response){
		 console.log(response);
	 });

	};

     
    $scope.getQuizID = function (MaxID){
        $scope.MaxID = MaxID;
   }

   $scope.addNewQuiz = function (MaxID){

	   $scope.MaxID = MaxID;
	   $scope.tags = angular.element('#addQ-hidden-input').val();
		var fd = new FormData();
		if($scope.files){
			fd.append('file',$scope.files[0]);
		}
		fd.append('quizTitle',$scope.quizTitle);
		fd.append('description',$scope.quizDesc);
		fd.append('part_type',$scope.type);
		fd.append('tags',$scope.tags);
		fd.append('admin_id',localStorage.getItem("user_id"));
		link = '/restAPI/api/Quizzes/add_quiz.php';
		$http.post(link,fd,{

			transfromRequest:angular.identity,
			headers:{'Content-Type':undefined}

		}).then(function(response){
			if(response.data.success){
				$location.path('/home');
				$('#newQuiz-modal').modal('show').modal('hide');
			}else{
				$scope.error1 = response.data.message;
				console.log(response.data);
			}
		}).catch(function(response){
			console.log(response);
		});
       if ($scope.type == 'Freeflow'){
       alert("freefloooooow");
		sendData = JSON.stringify({"type_name" : $scope.typeName, "quizID" : parseInt($scope.MaxID) + 1 , "duration" : $scope.duration});
		link = '/restAPI/api/Quizzes/setType.php';
		$http.post(link,sendData).then(function(response){
			if(response.data.success){
				alert(response.data.success);
				$('#newPart-modal').modal('show').modal('hide');
				    $route.reload();
			}else if(response.data.error){
				$scope.error = response.data.error;
				alert($scope.error);
			}
		}).catch(function(response){
			console.log(response);
		});
           }
	   };
});

theApp.controller('partsCtrlr', function($scope,$http,$route, $routeParams){
	$scope.quiz_id = $routeParams.quiz_id;
	getLink = "/restAPI/api/quizzes/viewQuizPart.php?quiz_id="+ $routeParams.quiz_id;
	$http.get(getLink).then(function(response){
		console.log(response.data);
		if(response.data.message){
			$scope.error = response.data.message;
		}else{
			console.log(response.data);
			$scope.quizTitle= response.data[0].QuizTitle;
            $scope.description= response.data[0].Description;
			$scope.parts = response.data;
			console.log("eto: " + $scope.quizTitle);
		}

	$scope.set_color = function(TypeID) {
    if(TypeID == 1)
        return {
						"width": "auto", "display": "inline-block", "padding": "2px 10px", "border-radius": "50px", "background-color": "#FEDFC8","color": "rgba(176,96,0,.72)"
					}
    else if(TypeID == 2)
        return {
					"background-color": "#E9D2FD", "width": "auto", "display": "inline-block", "padding": "2px 10px", "border-radius": "50px","color": "rgba(104,29,168,.72)"
				};
				else if(TypeID == 3)
		        return {
							"background-color": "#CBF0F8", "width": "auto", "display": "inline-block", "padding": "2px 10px", "border-radius": "50px","color": "rgba(0,123,131,.72)"
						};
						else
				        return {
									"background-color": "#FEEFC3","width": "auto", "display": "inline-block", "padding": "2px 10px", "border-radius": "50px","color": "rgba(227,116,0,.72)"
								};
};
$scope.checkQuestions = function(TotalQs) {
 if ( TotalQs == 0 ) { // your question said "more than one element"
   return true;
  }
  else {
   return false;
  }
};
$scope.transferQuestionData = function(QuestionID, QuizID, PartID, Question, Answer) {
		$scope.QuestionID = QuestionID;
		$scope.QuizID = QuizID;
		$scope.PartID = PartID;
		$scope.question = Question;
		$scope.answer = Answer;
		getLink = "/restAPI/api/quizzes/view_questions.php?part_id="+ PartID;
		$http.get(getLink).then(function (response) {
				$scope.questions = response.data;
		}).catch(function (response) {
				console.log(response);
		});
}
$scope.transferMultipleData = function(QuestionID,QuizID, PartID, Question, Answer,a,b,c,d) {
        $scope.QuizID = QuizID;
        $scope.PartID = PartID;
		$scope.QuestionID = QuestionID;
		$scope.question = Question;
        $scope.answer = Answer;
		$scope.choice1 = a;
        $scope.choice2 = b;
        $scope.choice3 = c;
        $scope.choice4 = d;
		getLink = "/restAPI/api/quizzes/view_questions.php?part_id="+ PartID;
		$http.get(getLink).then(function (response) {
				$scope.questions = response.data;
		}).catch(function (response) {
				console.log(response);
		});
}
$scope.updateTrueorFalse = function(QuestionID, QuizID, PartID, question, answer) {
		sendData = JSON.stringify({"quizID": QuizID, "partID": PartID, "question_id": QuestionID, "new_question": question, "correct": answer});
		link = '/restAPI/api/Quizzes/updatequestion.php';
		$http.post(link,sendData).then(function(response){
				alert('Question Updated Successfully.');
                $('#multipleChoicemodal_2').modal('show').modal('hide');
				$route.reload();
 }).catch(function(response){
				console.log(response);
 });
}

$scope.updateGuessWord = function(QuestionID, QuizID, PartID, question, answer) {
		sendData = JSON.stringify({"quizID": QuizID, "partID": PartID, "question_id": QuestionID, "new_question": question, "correct": answer});
		link = '/restAPI/api/Quizzes/updatequestion.php';
		$http.post(link,sendData).then(function(response){
				alert('Question Updated Successfully.');
                $('#multipleChoicemodal_4').modal('show').modal('hide');
				$route.reload();
 }).catch(function(response){
				console.log(response);
 });
}
$scope.updateMultiple = function(QuestionID, question, answer,a,b,c,d) {
		sendData = JSON.stringify({"question_id": QuestionID,"question": question, "correct": answer, "a":a,"b":b,"c":c,"d":d});
		link = '/restAPI/api/Quizzes/updateMultiple.php';
		$http.post(link,sendData).then(function(response){
				alert('Question Updated Successfully.');
            $('#multipleChoicemodal_1').modal('show').modal('hide');	
				$route.reload();
 }).catch(function(response){
				console.log(response);
 });
}
	});

	$scope.view = function(PartID){
		$scope.PartID = PartID;
		getLink = "/restAPI/api/quizzes/view_questions.php?part_id="+ $scope.PartID;

		$http.get(getLink).then(function(response){
			if(response.data.message){
				$scope.error = response.data.message;
			}else{
				console.log(response.data);
				$scope.questions = response.data;
			}
		});
	};

	$scope.addPart = function(){
		sendData = JSON.stringify({"type_name" : $scope.typeName, "quizID" : $routeParams.quiz_id, "part_title" : $scope.partTitle, "duration" : $scope.duration});
		link = '/restAPI/api/Quizzes/addQuizPart.php';
		$http.post(link,sendData).then(function(response){
			if(response.data.success){
				alert(response.data.success);
				$('#newPart-modal').modal('show').modal('hide');
				$route.reload();
			}else if(response.data.error){
				$scope.error = response.data.error;
				alert($scope.error);
			}
		}).catch(function(response){
			console.log(response);
		});
	   };

	$scope.printAnwerKey = function(){
		window.open('../../../restAPI/api/Hosts/printPDF.php?id='+$routeParams.quiz_id);
	}
});
//readOnly
theApp.controller('readOnlyCtrlr', function($scope,$http,$route, $routeParams){
	$scope.quiz_id = $routeParams.quiz_id;
	getLink = "/restAPI/api/quizzes/viewQuizPart.php?quiz_id="+ $routeParams.quiz_id;

	$http.get(getLink).then(function(response){
		if(response.data.message){
			$scope.error = response.data.message;
		}else{
			console.log(response.data);
			$scope.quizTitle= response.data[0].QuizTitle;
            $scope.description= response.data[0].Description;
            $scope.PartID= response.data.PartID;
			$scope.parts = response.data;
        }
	$scope.view = function(PartID,TypeID){
        $scope.TypeID = TypeID;
        //alert($scope.TypeID);
		$scope.PartID = PartID;

        if ($scope.TypeID == 1){
        $scope.validate_1 = true;
        $scope.validate_2 = false;
        $scope.validate_3 = false;
        $scope.validate_4 = false;
        }
        else if ($scope.TypeID == 2){
        $scope.validate_1 = false;
        $scope.validate_2 = true;
        $scope.validate_3 = false;
        $scope.validate_4 = false;
        }
        else if ($scope.TypeID == 4){
        $scope.validate_1 = false;
        $scope.validate_2 = false;
        $scope.validate_3 = false;
        $scope.validate_4 = true;
        }
        else{
        $scope.validate_1 = false;
        $scope.validate_2 = false;
        $scope.validate_3 = true;
        $scope.validate_4 = false;
        }
		getLink = "/restAPI/api/quizzes/view_questions.php?part_id="+ $scope.PartID;
          console.log($scope.PartID);
        
		$http.get(getLink).then(function(response){
			if(response.data.message){
				$scope.error = response.data.message;
			}else{
				console.log(response.data);
				$scope.questions = response.data;
			}
		});
        };
  });
});
theApp.controller('createQuizCtrlr', function($scope,$http,$location){
    $scope.quizTitle = 'MyQuizzenNo.0';
	getLink = "/restAPI/api/quizzes/read_quiz.php?admin_id="+ localStorage.getItem('user_id');
   $http.get(getLink).then(function(response){
       if(response.data.message){
		   $scope.error = response.data.message;
       }else{
		$scope.quizInfo = response.data;
		$scope.quizTitle = 'MyQuizzenNo.'+(response.data.length+1);
       }
   });
    $scope.getQuizID = function (MaxID){
        $scope.MaxID = MaxID;
   }
   $scope.addNewQuiz = function (MaxID){
       $scope.MaxID = MaxID;
		var fd = new FormData();
		if($scope.files){
			fd.append('file',$scope.files[0]);
		}
		fd.append('quizTitle',$scope.quizTitle);
		fd.append('description',$scope.quizDesc);
        fd.append('part_type',$scope.type);
		fd.append('admin_id',localStorage.getItem("user_id"));
		link = '/restAPI/api/Quizzes/add_quiz.php';
		$http.post(link,fd,{

			transfromRequest:angular.identity,
			headers:{'Content-Type':undefined}

		}).then(function(response){
			if(response.data.success){
				$location.path('/home');
				$('#newQuiz-modal').modal('show').modal('hide');
			}else{
				$scope.error1 = response.data.message;
				console.log(response.data);
			}
		}).catch(function(response){
			console.log(response);
		});
       if ($scope.type == 'Freeflow')
           {
       alert("freefloooooow");
		sendData = JSON.stringify({"type_name" : $scope.typeName, "quizID" : parseInt($scope.MaxID) + 1 , "duration" : $scope.duration});
		link = '/restAPI/api/Quizzes/setType.php';
		$http.post(link,sendData).then(function(response){
			if(response.data.success){
				alert(response.data.success);
				$('#newPart-modal').modal('show').modal('hide');
				    $route.reload();
			}else if(response.data.error){
				$scope.error = response.data.error;
				alert($scope.error);
			}
		}).catch(function(response){
			console.log(response);
		});
           }
	   };
});

theApp.controller('updatePart', function($scope, $http, $routeParams, $location){

	getLink = "/restAPI/api/Quizzes/single-part.php?partID="+ $routeParams.part_id;

	if ($routeParams.totalqs > 0){
		$scope.total = $routeParams.totalqs;
	}
	$http.get(getLink).then(function(response){
		console.log(response.data);
		$scope.part_title = response.data.part_title;
		$scope.duration = response.data.duration;
		$scope.type = response.data.type;
	});

	$scope.updatePart = function(){
		sendData = JSON.stringify({"new_part_title" : $scope.part_title, "type_name" : $scope.type, "duration" : $scope.duration, "part_id" : $routeParams.part_id});
		link = '/restAPI/api/Quizzes/editQuizPart.php';
		$http.post(link,sendData).then(function(response){
			console.log(response.data);
			if(response.data.success){
				alert("NICE ONE");
				$location.path('/viewparts/').search({param: 35});
			}else{
				$scope.error = response.data;
			}
		}).catch(function(response){
			console.log(response);
		});
	};
});

theApp.controller('multipleCtrlr', function($scope,$http,sessionService,$routeParams){
	$scope.multipleQuestion = function(){
   	sendData = JSON.stringify({"quiz_id" : $routeParams.quiz_id ,"part_id" : $routeParams.part_id , "question" : $scope.question , "correct" : $scope.answer, "a" : $scope.choice1, "b" : $scope.choice2, "c" : $scope.choice3, "d" : $scope.choice4 });
	link = "/restAPI/api/Quizzes/multiple_choice.php";
    	$http.post(link,sendData).then(function(response){
		if(response.data.success){
			alert("Question Successfully Added!");
		}else{
			$scope.error = response.data;
            console.log(response.data);
		}
	}).catch(function(response){
		console.log(response);
	});

   };

	$scope.uploadCSV = function(){
		var fd = new FormData();
		fd.append('multiple',$scope.files[0]);
		fd.append('quiz_id',$routeParams.quiz_id);
		fd.append('part_id',$routeParams.part_id);

		$http.post('/restAPI/api/Quizzes/csv_multiple_choice.php',fd,{
			transfromRequest:angular.identity,
			headers:{'Content-Type':undefined}
		}).then(function(response){
			if(response.data.error){
				$scope.clearResponse();
				$scope.csverror = response.data;
			}else{
				$scope.clearResponse();
				$scope.csvsuccess = response.data;
			}
		}).catch(function(response){
			console.log(response.data);
		});
	};

	$scope.clearResponse = function(){
   		$scope.csverror = null;
   		$scope.csvsuccess = null;
   }

});

theApp.controller('addCtrlr', function($scope,$http,sessionService,$routeParams){
	$scope.addQuestion = function(){
	alert($routeParams.part_id);
   	sendData = JSON.stringify({"quiz_id" : $routeParams.quiz_id ,"part_id" : $routeParams.part_id , "question" : $scope.question , "correct" : $scope.answer });
	link = "/restAPI/api/Quizzes/true_or_false.php";
    	$http.post(link,sendData).then(function(response){
		if(response.data.success){
			alert("Question Successfully Added!");
		}else{
			$scope.error = response.data;
            console.log(response.data);
		}
	}).catch(function(response){
		console.log(response);
	});

   };

   	$scope.uploadCSV = function(){
		var fd = new FormData();
		fd.append('TorF',$scope.files[0]);
		fd.append('quiz_id',$routeParams.quiz_id);
		fd.append('part_id',$routeParams.part_id);

		$http.post('/restAPI/api/Quizzes/csv_multiple_choice.php',fd,{
			transfromRequest:angular.identity,
			headers:{'Content-Type':undefined}
		}).then(function(response){
			$scope.clearResponse();
			if(response.data.error){	
				$scope.csverror = response.data;
			}else{
				$scope.csvsuccess = response.data;
			}
		}).catch(function(response){
			console.log(response.data);
		});
	};

	$scope.clearResponse = function(){
   		$scope.csverror = null;
   		$scope.csvsuccess = null;
   }

});

theApp.controller('guessCtrlr', function($scope,$http,sessionService,$routeParams){
	$scope.guessQuestion = function(){
   	sendData = JSON.stringify({"quiz_id" : $routeParams.quiz_id ,"part_id" : $routeParams.part_id , "question" : $scope.question , "correct" : $scope.answer });
	link = "/restAPI/api/Quizzes/guess_the_word.php";
    	$http.post(link,sendData).then(function(response){
		if(response.data.success){
			alert("Question Successfully Added!");
		}else{
			$scope.error = response.data;
	        console.log(response.data);
		}
	}).catch(function(response){
		console.log(response);
	});

   };

   $scope.uploadCSV = function(){
   		var fd = new FormData();
		fd.append('GTW',$scope.files[0]);
		fd.append('quiz_id',$routeParams.quiz_id);
		fd.append('part_id',$routeParams.part_id);

		$http.post('/restAPI/api/Quizzes/csv_multiple_choice.php',fd,{
			transfromRequest:angular.identity,
			headers:{'Content-Type':undefined}
		}).then(function(response){
			$scope.clearResponse();
			if(response.data.error){
				$scope.csverror = response.data;
			}else{
				$scope.csvsuccess = response.data;
			}
		}).catch(function(response){
			console.log(response.data);
		});
   };

   $scope.clearResponse = function(){
   		$scope.csverror = null;
   		$scope.csvsuccess = null;
   }

});

theApp.controller('CSVSTUDENTS', function($scope,$http){
	$scope.uploadCS = function(){
		var fd = new FormData();
		fd.append('students',$scope.files[0]);

		$http.post('/restAPI/api/Quizzes/csv_multiple_choice.php',fd,{
			transfromRequest:angular.identity,
			headers:{'Content-Type':undefined}
		}).then(function(response){
			console.log(response.data);
		}).catch(function(response){
			console.log(response.data);
			console.log('asdasd');
		});

	}
});

theApp.controller('empIDChecker' , function($scope, $http, $location){
	$scope.checkID = function(){
		sendData = JSON.stringify({"empID": $scope.empID});
		link = "/restAPI/api/Homestead/Admins/empIDChecker.php";
		$http.post(link, sendData).then(function(response){
			if(!response.data.error){
				if(response.data.empData[0].status == "true"){
					alert("This employee id is already used!!");
				}else{
					$scope.fname = response.data.empData[0].fname;
					$scope.lname = response.data.empData[0].lname;
					$scope.empID = response.data.empData[0].id;
					alert($scope.empID);
					console.log(response.data);
					$location.path('/signup/'+$scope.fname+'*'+$scope.lname+'*'+$scope.empID);
				}
			}else{
				console.log(response.data.error);
			}
		}).catch(function(response){
			console.log(response);
		});
	};
});

theApp.controller('empRequest', function($scope, $http){
	$scope.openRequest = function(){
		
		if($scope.message == undefined){
			$scope.message = null;
		}

		if($scope.mname == undefined){
			$scope.mname = null;
		}

		alert($scope.message);
		alert($scope.mname);

		sendData = JSON.stringify({"empID" : $scope.empID, "fname" : $scope.fname, "mname" : $scope.mname, "lname" : $scope.lname, "message" : $scope.message});
		link = "/restAPI/api/homestead/Admins/request-homestead.php";
		$http.post(link, sendData).then(function(response){
			if(response.data.success){
				alert("request created");
			}else if (response.data.message){
				alert("this is already in our database");
			}else{
				alert("request error");
			}
		}).catch(function(response){
			console.log(response);
		});
	}
});

theApp.controller('viewTagCtrl', function($scope, $http, $routeParams){
	$scope.tagName = $routeParams.tag_name;

	getLink = '/restAPI/api/quizzes/filter_quiz_by_tag.php?admin_id=' +localStorage.getItem("user_id") + '&tag_id=' + $routeParams.tag_id;
	$http.get(getLink).then(function(response){
		$scope.quizTagInfo = response.data.data;
		console.log($scope.quizTagInfo);
	}).catch(function(response){
		console.log(response);
	});

});