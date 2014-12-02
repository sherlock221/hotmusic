angular.module("hotmusic")
 .controller("SplashCtrl",function($scope,$rootScope,$state,$timeout){
        $scope.goToLogin = function(){
            $state.go("auth.login");
        }
        $scope.goRegister = function(){
            $state.go("auth.register");
        }

        $scope.slidesChanged = function(index){
            console.log(index);
        }

        $scope.activeSlide = function(index){
            console.log("active..." + index)
        }
  });