
app.factory("studentFactory", ($http) => {
  var service = {};
  service.GetAll = GetAll;
  service.GetByEmail = GetByEmail;
  service.CreateAccount = CreateAccount;
  function GetAll() {
    return $http
      .get("http://localhost:3000/students")
      .then(handleSuccess, handleError("Không load được user"));
  }

  function GetByEmail(email) {
    return $http
      .get("http://localhost:3000/students?email=" + email)
      .then(handleSuccess, handleError("Không kết nối được"));
  }

  function CreateAccount(){
    return $http
    .post("http://localhost:3000/students")
    .then(handleSuccess, handleError("Không kết nối được"));
  }

  function handleSuccess(res) {
    return res.data;
  }
  function handleError(error) {
    return function () {
      return { success: false, message: error };
    };
  }
  return service;
});

app.service("studentService", function (studentFactory) {
  this.studentsGetAll = () => {
    return studentFactory.GetAll();
  };
  this.studentsGetByEmail = (email) => {
    return studentFactory.GetByEmail(email);
  };
  this.studentsCreate = () =>{
    return studentFactory.CreateAccount();
  }
});

app.factory("AuthFactory", ($cookies) => {
  var user = {};
  user.setStudent = setStudent;
  user.getStudent = getStudent;
  user.clear = clear;
  function setStudent(NameCookies,student) {
    user = student;
    return $cookies.putObject(NameCookies,user);
  }

  function getStudent(NameCookies){
    return $cookies.getObject(NameCookies);
  }

  function clear(NameCookies) {
    return $cookies.putObject(NameCookies,null);
  }

  return user;
});

app.service("authService", function (AuthFactory) {
  this.SetStudentService = (NameCookies,students) => {
    return AuthFactory.setStudent(NameCookies,students);
  };

  this.GetStudentService = (NameCookies) =>{
    return AuthFactory.getStudent(NameCookies)
  }
  this.ClearStudentService = (NameCookies) => {
    return AuthFactory.clear(NameCookies);
  };
});
