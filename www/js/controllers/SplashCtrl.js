angular.module("hotmusic")
 .controller("SplashCtrl",function($scope,$rootScope,$state,$timeout){
        $scope.goToLogin = function(){
            $state.go("auth.login");
        }
        $scope.goRegister = function(){
            $state.go("auth.register");
        }

  });