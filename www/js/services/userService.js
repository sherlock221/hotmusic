
/** 用户状态操作 **/

angular.module("hotmusic")
       .factory("userService",function($q,$http,SERVER,Storage){

       var userService = {
          //user对象
          user :  {}
       };

      var userDefer = $q.defer();

      //保存用户验证信息
      userService.save = function(newUser){
         userDefer = $q.defer();

          Storage.saveCredentials(newUser).then(function(){
             angular.extend(userService.user,newUser);
             userDefer.resolve();
          },function(){
             userDefer.reject();
          });

          return  userDefer.promise;
      }

      //清除用户信息
      userService.clear = function(){
            userDefer = $q.defer();
            Storage.deleteCredentials().finally(function(){
                //清空用户对象
                userService.user = {};
                userDefer.reject();
            });

            return userDefer.promise;
      }


      return userService;
   });