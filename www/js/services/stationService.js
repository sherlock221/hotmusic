//异步函数 都支持promise规范进行

angular.module("hotmusic")
    .factory("stationService",function($q,$http,$time,SERVER){
        var o = {
        };




        //ding声音
        o.ding = function(){
            var defer = $q.defer();

            if (!o.dingObj) {
                o.dingObj = new Media('assets/ding.mp3');
            }

            o.dingObj.play();

            $timeout(function(){
                o.dingObj.stop();
                defer.resolve();
            },600);

            return defer.promise;
        }



        return o;
    });