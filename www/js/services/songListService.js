//异步函数 都支持promise规范进行

angular.module("hotmusic")
    .factory("songListService",function($q,$http,SERVER){
        var service = {
            favorites : [],
            newFavorites :[],
            total : 0
        };


       service.get = function(){
          var  defer = $q.defer();




           return defer.promise;
       }


        return service;
    });