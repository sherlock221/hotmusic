//异步函数 都支持promise规范进行

angular.module("hotmusic")
    .factory("songListService",function($q,$http,SERVER){
        var o = {
            favorites: [],
            total: 0,
            newFavorites: []
        };




        return o;
    });