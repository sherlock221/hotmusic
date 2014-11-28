//异步函数 都支持promise规范进行

angular.module("hotmusic")
       .factory("userService",function($q,$http,SERVER){

        var service = {};
        service.login = function(user){
            var defer = $q.defer();
            $http.post(SERVER.url+"/users/login",{user:user})
                .success(function(data){
                    defer.resolve(data);
                })
                .error(function(err,status){
                    defer.reject(err, status);
                });
            return defer.promise;
        }


        service.register = function(user){
            var defer = $q.defer();

            $http.post(SERVER.url + "/users/register",{user:user})
                .success(function(data){
                    defer.resolve(data);
                })
                .error(function(err,status){
                    defer.reject(err,status);
                });
            return defer.promise;
        }
        return service;
   });