app.controller(
  "loginCrt",
  function ($scope, studentService, authService, $window, handleMsgService) {
    $scope.test = () => {
      studentService.studentsGetByEmail($scope.email).then(function (data) {
        $scope.user = data;
        if ($scope.user != 0) {
          // document.getElementById("usernameCheck").innerHTML = "";
          handleMsgService.handleMsg("usernameCheck", "");
          for (var i = 0; i < $scope.user.length; i++) {
            if ($scope.user[i].password != $scope.password) {
              // document.getElementById("passwordCheck").innerHTML =
              //   "Sai mật khẩu";
              handleMsgService.handleMsg("passwordCheck", "Sai mật khẩu");
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
          // document.getElementById("usernameCheck").innerHTML =
          //   "Tên đăng nhập không tồn tại";

          handleMsgService.handleMsg(
            "usernameCheck",
            "Tên đăng nhập không tồn tại"
          );
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

app.controller(
  "registerCrt",
  function ($scope, studentService, handleMsgService) {
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
      studentService.studentsGetByEmail($scope.email).then(function (data) {
        $scope.user = data;
        if ($scope.user != 0) {
          // document.getElementById("Check").innerHTML =
          // "Email đã tồn tại vui lòng chọn email khác";
          handleMsgService.handleMsg(
            "Check",
            "Email đã tồn tại vui lòng chọn email khác"
          );
          $scope.email = "";
        } else {
          if ($scope.password == $scope.passwordConfirm) {
            studentService.studentsCreate(userRegister);
          } else {
            $scope.password = "";
            $scope.passwordConfirm = "";
            // document.getElementById("Check").innerHTML =
            //   "Mật khẩu xác nhận không khớp";
            handleMsgService.handleMsg("Check", "Mật khẩu xác nhận không khớp");
          }
        }
      });
    };
  }
);
