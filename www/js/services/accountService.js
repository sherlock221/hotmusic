//异步函数 都支持promise规范进行

angular.module("hotmusic")
    .factory("accountService",function($q,$http,SERVER,userService){
        var service = {};


        service.login = function(user){
            var defer = $q.defer();
            $http.post(SERVER.url+"/users/login",{user:user})
                .success(function(data){
                    //保存用户信息到手机存储
                    userService.save(data).then(function(){
                        console.log("LOOK login:" + JSON.stringify(data));
                        defer.resolve(data);
                    },function(err, status){
                        defer.reject(err, status);
                    });

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
                    userService.save(data).then(function(){
                        console.log("LOOK register:" + JSON.stringify(data));
                        defer.resolve(data);
                    },function(err,status){
                        defer.reject(err,status);
                    });
                })
                .error(function(err,status){
                    defer.reject(err,status);
                });
            return defer.promise;
        }


        return service;
    });