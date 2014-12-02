angular.module("hotmusic")
       .controller("FavoriteCtrl",function($scope,$stateParams,$log ,$state,Profile){
                var _this = this;

                //获得参数传递过来的名称
//                $scope.userName = $stateParams.userName;
                $scope.userName = "lock221";

                $scope.isUser = false;

                //是否显示
                $scope.profileInfo = false;

//                if ($scope.username == $scope.me.username) {
//                    $scope.isUser = true;
//                    // copy songs, then clear songlit
//                    $scope.newSongs = Songlist.newFavorites;
//                    Songlist.newFavorites = [];
//                }


                //获得此用户基本信息
                     Profile.get($scope.userName).then(function(profileInfo){
                        $scope.profileInfo = profileInfo;
                        $scope.userName = profileInfo.username;
                        $scope.favorites = Profile.profileCache[$scope.profileInfo.username].favorites;
                },function(error){
                    alert("失败!" + error);
                });


                $scope.changeProfilePicture = function(){

                }

        });