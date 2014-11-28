angular.module("hotmusic")
 .controller("AuthCtrl",function($scope,$rootScope,$state,$log,$timeout,userService){
        var _this  = this;
        this.state = $state;

        //表单值
        $scope.user= {
            userEmail : "",
            passWord  : "",
            birthday  : ""
        }

        //登录
        this.login = function(){
            _this.submitted = true;
            var user = {
                login :$scope.user.userEmail,
                password  :   $scope.user.passWord
            };
            userService.login(user).then(function(data){
                console.log(data);
                _this.submitted = false;
            },function(err,status){
                alert(err.error);
                $log.error('HTTP error - status:', status, 'Error:', err);
                _this.submitted = false;
            });
        }


        //注册
        this.register = function(){
            _this.submitted = true;

            var user = {
                email :$scope.user.userEmail,
                password  :   $scope.user.passWord,
                birthday  : $scope.user.birthday
            };

            userService.register(user).then(function(data){
                console.log(data);
                alert("注册成功！");
                _this.submitted = false;
            },function(err,status){
                alert(err.error);
                $log.error('HTTP error - status:', status, 'Error:', err);
                _this.submitted = false;
            });

        }
  });