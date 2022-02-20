// setup routing ( cài đặt định tuyến)

// app.config(function ($routeProvider,$locationProvider) {
//   $routeProvider
//     .when("/", {
//       templateUrl: "/components/home.html",

//     })
//     .when("/course", {
//       templateUrl: "/components/course.html",
//     })
//     .when("/Q&A", {
//       templateUrl: "../components/Q&A.html",
//     })
//     .when("/contact", {
//       templateUrl: "../components/contact.html",

//     }).when("/signup", {
//       templateUrl: "../components/signup.html",
//     }).otherwise({
// 			redirectTo: '/',

// 		});
//     $locationProvider.html5Mode(true);
// });
app.config(function ($stateProvider, $urlRouterProvider) {
  var homeState = {
    name: "home",
    url: "/",
    templateUrl: "/components/home.html",
  };

  var courseState = {
    name: "course",
    url: "/course",
    templateUrl: "/components/course.html",
    resolve: { authenticate: authenticate },
  };
  var QnAState = {
    name: "QnA",
    url: "/QnA",
    templateUrl: "/components/Q&A.html",
  };

  var contactState = {
    name: "Contact",
    url: "/contact",
    templateUrl: "/components/contact.html",
  };
  var loGinState = {
    name: "Login",
    url: "/Login",
    templateUrl: "/components/login.html",
    controller: "loginCrt",
  };

  $stateProvider.state(homeState);

  $stateProvider.state(courseState);

  $stateProvider.state(QnAState);
  $stateProvider.state(contactState);
  $stateProvider.state(loGinState);
  $urlRouterProvider.otherwise("/");
  // $locationProvider.html5Mode(true)
});

//Controller
// app.controller('header-footer', function($scope) {
//   $scope.navbar = "../components/navbar.html";
//   $scope.footer = "../components/footer.html"
// });

function authenticate(authService, $state) {
  if (authService.GetStudentService("user") == null) {
    $state.go("Login");
  } else {
    $state.go("course");
  }
}
