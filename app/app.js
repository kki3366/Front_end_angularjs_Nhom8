app.controller(
  "loginCrt",
  function ($scope, studentService, authService, $window) {
    $scope.test = () => {
      studentService.studentsGetByEmail($scope.email).then(function (data) {
        $scope.user = data;
        if ($scope.user != 0) {
          document.getElementById("usernameCheck").innerHTML = "";
          for (var i = 0; i < $scope.user.length; i++) {
            if ($scope.user[i].password != $scope.password) {
              document.getElementById("passwordCheck").innerHTML =
                "Sai mật khẩu";
            } else {
              authService.SetStudentService("user", $scope.user[i]);
              // console.log(authService.GetStudentService('user').email)
              // authService.ClearStudentService('user');
              $window.location.reload();
              $window.location.assign("/");
              // $location.url('/')
            }
          }
        } else {
          document.getElementById("usernameCheck").innerHTML =
            "Tên đăng nhập không tồn tại";
        }
      });
    };
  }
);

app.controller("header-footer", function ($scope, authService, $window) {
  $scope.navbar = "../components/navbar.html";
  $scope.footer = "../components/footer.html";
  // angular.element(document.getElementById("x1")).text("Value changed");

  if (authService.GetStudentService("user") == null) {
    $scope.showUserProfile = false;
    // angular.element(document.getElementById("x1")).text("Value changed");
  }
  if (authService.GetStudentService("user") != null) {
    $scope.emailName = authService.GetStudentService("user").email;
    $scope.showUserProfile = true;
  }
  console.log(authService.GetStudentService("user"));

  $scope.logout = () => {
    authService.ClearStudentService("user");
    $window.location.reload();
    $window.location.assign("/");
  };
});

app.controller("registerCrt", function ($scope, studentService) {
  $scope.register = function () {
    $scope.email;
    $scope.password;
    $scope.passwordConfirm;
    $scope.fullname;
    var userRegister = {
      email: $scope.email,
      password: $scope.password,
      fullname: $scope.fullname,
    };
    if ($scope.password == $scope.passwordConfirm) {
      studentService.studentsCreate(userRegister).then(function (data) {
        if (data) {
          alert("okay");
        }
      });
    } else {
      $scope.password = "";
      $scope.passwordConfirm = "";
      document.getElementById("Check").innerHTML =
        "Mật khẩu xác nhận không khớp";
    }
  };
});
