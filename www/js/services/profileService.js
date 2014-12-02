//异步函数 都支持promise规范进行

angular.module("hotmusic")
    .factory("Profile",function($q,$http,SERVER,Track){

        var profile = {
                profileCache : {}
        };


        profile.get = function(userName,fromServer){
          var  defer = $q.defer();

           if(profile.profileCache[userName] && !fromServer){
               defer.resolve(profile.profileCache[userName]);
           }
           else{
               //如果缓存没有就从服务器中取出来
                $http({
                    method: 'GET',
                    url: SERVER.url + '/users/?username=' + userName
                })
                .success(function(data, status, headers, config){

                        //加入缓存中
                        profile.cache(data);
                        defer.resolve(data);
                 })
                .error(function(data, status, headers, config){
                       defer.reject(data);
                 });

           }
          return defer.promise;
       }


        profile.cache = function(data){
            var favTmp = data.favorites;
            data.favorites = [];
            for(var i = 0; i < favTmp.length; i++){
                data.favorites.push(new Track(favTmp[i]));
            }
            profile.profileCache[data.userName] = data;
        }


        return profile;
    });